#!/usr/bin/env python3
"""Build the two-page interview PDF from the same JSON used by Astro.

Requires PyMuPDF >= 1.27. Run from any directory; paths resolve from this file.
The layout fails rather than silently shrinking content if a page overflows.
"""
from __future__ import annotations

import hashlib
import json
from html import escape
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/data/resume/interview.json'
AVATAR = ROOT / 'src/assets/avatar.png'
OUTPUT = ROOT / 'public/cv.pdf'
MANIFEST = ROOT / 'src/data/resume/pdf-snapshot.json'
ACCENT = '#165f5c'


def e(value: str) -> str:
    return escape(value, quote=True)


def link(url: str, label: str) -> str:
    return f'<a href="{e(url)}" style="color: #165f5c; text-decoration: none">{e(label)}</a>'


def heading(title: str, date: str, url: str | None = None) -> str:
    text = link(url, title) if url else e(title)
    return (
        '<table class="entry-heading"><tr>'
        f'<td class="entry-title">{text}</td>'
        f'<td class="date">{e(date)}</td></tr></table>'
    )


def section_html(section: dict) -> str:
    kind = section['kind']
    out = [f'<h2>{e(section["title"])}</h2>']
    if kind == 'summary':
        out.append(f'<p class="summary">{e(section["text"])}</p>')
    elif kind == 'timeline':
        for item in section['items']:
            out.append('<div class="timeline-entry">')
            out.append(heading(item['title'], item['date']))
            out.append(f'<p class="subtitle">{e(item["subtitle"])}</p>')
            out.append(f'<p class="detail">{e(item["detail"])}</p></div>')
    elif kind == 'skills':
        out.append('<table class="skills">')
        for item in section['items']:
            out.append(f'<tr><td class="skill-label">{e(item["label"])}</td><td>{e(item["text"])}</td></tr>')
        out.append('</table>')
    elif kind == 'projects':
        for item in section['items']:
            out.append('<div class="project">')
            out.append(heading(item['title'], item['date'], item['link']))
            out.append(f'<p class="role">{e(item["role"])}</p><ul>')
            out.extend(f'<li>{e(bullet)}</li>' for bullet in item['bullets'])
            out.append('</ul></div>')
    elif kind == 'publications':
        out.append(f'<p class="note">{e(section["note"])}</p><ol class="publications">')
        for item in section['items']:
            accepted = ' accepted' if 'Accepted' in item['venue'] else ''
            out.append(f'<li>{link(item["url"], item["title"])}<p class="venue{accepted}">{e(item["venue"])}</p></li>')
        out.append('</ol>')
    else:
        raise ValueError(f'Unknown section kind: {kind}')
    return ''.join(out)


CSS = f'''
@font-face {{ font-family: ResumeHan; src: url(resume-han.ttf); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: ResumeHan; color: #25332f; font-size: 9.15pt; line-height: 1.42; }}
a {{ color: #165f5c; text-decoration: none; }}
p {{ margin: 0; }}
table {{ width: 100%; border-collapse: collapse; }}
td {{ padding: 0; vertical-align: top; }}
.header {{ border-bottom: 1.5pt solid {ACCENT}; margin-bottom: 8pt; padding-bottom: 10pt; }}
.eyebrow {{ color: #4c7773; font-size: 6.4pt; letter-spacing: 1.3pt; margin-bottom: 4pt; }}
.name {{ font-size: 25pt; font-weight: bold; line-height: 1.2; }}
.english {{ font-family: Times; font-size: 12pt; font-weight: normal; color: #6b7972; }}
.headline {{ color: #46605c; font-size: 9pt; margin-top: 6pt; }}
.contacts {{ width: 166pt; text-align: right; font-size: 7.5pt; line-height: 1.7; padding-top: 10pt; color: #50625e; }}
.portrait-cell {{ width: 64pt; vertical-align: middle; padding-right: 10pt; }}
.portrait {{ width: 52pt; }}
.continuation {{ font-size: 9pt; color: #526764; }}
.continuation-name {{ font-size: 17pt; font-weight: bold; color: #203a36; }}
h2 {{ margin: 10pt 0 6pt; padding-bottom: 3pt; border-bottom: .5pt solid #dce6e3; color: {ACCENT}; font-size: 10.2pt; font-weight: bold; }}
.summary {{ line-height: 1.55; }}
.entry-heading {{ margin-bottom: 1pt; }}
.entry-title {{ font-size: 9.4pt; font-weight: bold; }}
.date {{ width: 106pt; text-align: right; white-space: nowrap; font-size: 7.6pt; color: #647571; padding-left: 5pt; }}
.timeline-entry {{ margin-bottom: 5pt; }}
.subtitle {{ font-size: 8pt; color: #46605a; margin-top: 1pt; }}
.detail {{ font-size: 8.4pt; line-height: 1.4; color: #53635f; margin-top: 1pt; }}
.skills {{ font-size: 8.5pt; line-height: 1.45; }}
.skills td {{ padding-bottom: 3pt; }}
.skill-label {{ width: 61pt; color: #385b53; font-weight: bold; }}
.project {{ margin-bottom: 8pt; }}
.role {{ color: #53756a; font-size: 8pt; margin: 2pt 0 4pt; }}
ul {{ padding-left: 12pt; margin: 0; }}
li {{ margin-bottom: 3pt; }}
.note {{ color: #75817a; font-size: 7.8pt; margin-bottom: 6pt; }}
.publications {{ padding-left: 17pt; margin: 0; font-size: 9pt; line-height: 1.3; }}
.publications li {{ margin-bottom: 6pt; }}
.venue {{ font-size: 7.7pt; color: #75817a; margin-top: 1pt; }}
.accepted {{ color: {ACCENT}; font-weight: bold; }}
'''


def build() -> None:
    source_bytes = SOURCE.read_bytes()
    data = json.loads(source_bytes)
    source_hash = hashlib.sha256(source_bytes).hexdigest()
    font = fitz.Font('cjk')
    archive = fitz.Archive()
    archive.add(font.buffer, 'resume-han.ttf')
    archive.add(AVATAR.read_bytes(), 'resume-portrait.png')
    document = fitz.open()
    for index, spec in enumerate(data['pages']):
        page = document.new_page(width=fitz.paper_rect('a4').width, height=fitz.paper_rect('a4').height)
        if index == 0:
            header = (
                '<table class="header"><tr><td class="portrait-cell"><img class="portrait" src="resume-portrait.png"></td><td>'
                '<p class="eyebrow">RESEARCH &amp; ENGINEERING</p>'
                f'<p class="name">{e(data["name"])} <span class="english">{e(data["englishName"])}</span></p>'
                f'<p class="headline">{e(data["headline"])}</p></td>'
                '<td class="contacts">'
                f'{e(data["location"])}<br>{link("mailto:" + data["email"], data["email"])}<br>'
                f'{link(data["website"], data["website"])}'
                '</td></tr></table>'
            )
        else:
            header = (
                '<table class="header continuation"><tr>'
                f'<td><span class="continuation-name">{e(data["name"])}</span>　{e(spec["label"])}</td>'
                f'<td class="contacts">{link(data["website"], data["website"])}</td></tr></table>'
            )
        html = header + ''.join(section_html(section) for section in spec['sections'])
        spare, scale = page.insert_htmlbox(fitz.Rect(40, 35, page.rect.width - 40, page.rect.height - 46), html, css=CSS, archive=archive, scale_low=1)
        if spare < 0 or scale < 0.999:
            raise ValueError(f'Page {index + 1} overflows A4. Shorten content or adjust layout; automatic shrinking is disabled.')
        footer = (
            '<table style="font-family: ResumeHan; font-size: 6.8pt; color: #7f8d86"><tr>'
            f'<td>更新于 {e(data["updated"])} · 完整经历与项目资源：{link(data["website"], data["website"])}</td>'
            f'<td style="text-align: right">{index + 1:02d} / {len(data["pages"]):02d}</td></tr></table>'
        )
        page.insert_htmlbox(fitz.Rect(40, page.rect.height - 32, page.rect.width - 40, page.rect.height - 12), footer, css=CSS, archive=archive, scale_low=1)
        print(f'Page {index + 1}: {spare:.1f} pt remaining; scale={scale:.2f}')
    document.set_metadata({'title': f'{data["name"]} - 面试简历', 'author': data['name'], 'subject': f'source-sha256:{source_hash}', 'creator': 'FollowHub interview resume template'})
    document.subset_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(OUTPUT, garbage=4, deflate=True)
    document.close()
    with fitz.open(OUTPUT) as check:
        if check.page_count != len(data['pages']):
            raise ValueError('Unexpected page count')
        text = ''.join(page.get_text() for page in check)
        if data['name'] not in text or 'InternW0' not in text:
            raise ValueError('PDF text extraction failed')
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps({'sourceSha256': source_hash, 'avatarSha256': hashlib.sha256(AVATAR.read_bytes()).hexdigest(), 'pdfSha256': hashlib.sha256(OUTPUT.read_bytes()).hexdigest(), 'pages': len(data['pages']), 'updated': data['updated']}, ensure_ascii=False, indent=2) + '\n')
    print(f'PDF written: {OUTPUT.name} ({OUTPUT.stat().st_size:,} bytes)')


if __name__ == '__main__':
    build()
