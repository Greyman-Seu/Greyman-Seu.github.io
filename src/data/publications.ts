import type { ComponentProps } from 'astro/types'

import type PublicationSection from '@/components/academic/PublicationSection.astro'

export const publications: ComponentProps<typeof PublicationSection>['publications'] = [
  {
    slug: 'paper-flowvla',
    title: 'FlowVLA: Learning Flow-Aware Physical Completion for Quantitative Robotic Pouring',
    authors: [
      { name: 'Liwen Yang' },
      { name: 'Yutian Zhang' },
      { name: 'Jiaqi Zhai' },
      { name: 'Li Yang' },
      { name: 'Tutian Tang' },
      { name: 'Qiwei Shan' },
      { name: 'Yancheng Bi' },
      { name: 'Qiankuan Shangguan' },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Ce Hao' },
      { name: 'Dong Wei' },
      { name: 'Qiaojun Yu' },
      { name: 'Dibo Hou' }
    ],
    venue: 'ArXiv Preprint',
    year: '2026',
    type: 'preprint',
    abstract:
      '面向定量机器人倾倒，将动作生成与物理完成度估计解耦，融合视觉、关节与腕部力信息估计累计转移质量，并结合残余出流预测决定回收时机，提升目标质量控制精度。',
    links: [{ type: 'arxiv', href: 'https://arxiv.org/abs/2610.29692' }],
    status: 'preprint'
  },
  {
    slug: 'paper-vommi',
    title: 'VOMMI: Collecting and Leveraging Portable Demonstrations for Mobile Manipulation',
    authors: [
      { name: 'Yutian Zhang' },
      { name: 'Xingrui Xiong' },
      { name: 'Siyuan Ma' },
      { name: 'Yang Li' },
      { name: 'Jiawen Wen' },
      { name: 'Jiaqi Zhai' },
      { name: 'Liwen Yang' },
      { name: 'Ce Hao' },
      { name: 'Haozhen Chi' },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Yifan Zhu' },
      { name: 'Xiaowen Chu' },
      { name: 'Dong Wei' },
      { name: 'Qiaojun Yu' },
      { name: 'Dibo Hou' }
    ],
    venue: 'ArXiv Preprint',
    year: '2026',
    type: 'preprint',
    abstract:
      '通过同步机身与手部 RGB 视角采集便携式移动操作示范，以 R2-VO 离线轨迹重建和在线视觉运动条件连接示范数据与 VLA 后训练，降低移动操作数据采集成本并提升真机任务表现。',
    links: [{ type: 'arxiv', href: 'https://arxiv.org/abs/2610.08220' }],
    status: 'preprint'
  },
  {
    slug: 'paper-internw0',
    title: 'InternW0: A Foundational Physical World Model for Efficient Real-World Interactions',
    authors: [
      { name: 'Jisong Cai' },
      { name: 'Yao Mu' },
      { name: 'Ganlin Yang' },
      { name: 'Zhe Cao' },
      { name: 'Zhangzheng Tu' },
      { name: 'Xing Gao' },
      { name: 'Kailin Li' },
      { name: 'Xinyu Zhan' },
      { name: 'Lixin Yang' },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Haoxiang Ma' },
      { name: 'Ming Zhou' },
      { name: 'Qiaojun Yu' },
      { name: 'Yufei Xue' },
      { name: 'Liqun He' },
      { name: 'Yifei Yao' },
      { name: 'Yifan Zhu' },
      { name: 'Long Ling' },
      { name: 'Bingqi Jiang' },
      { name: 'Haoyu Guo' },
      { name: 'Xueyue Zhu' },
      { name: 'Bowen Zhou' },
      { name: 'Bin Zhao' },
      { name: 'Tianfan Xue' },
      { name: 'Chunhua Shen' },
      { name: 'Weinan Zhang' }
    ],
    venue: 'ArXiv Technical Report',
    year: '2026',
    type: 'preprint',
    abstract:
      '以非对称视频与动作架构联合学习未来视觉动态和连续机器人控制，通过异步多频推理与观测条件上下文路由复用预测信息，并结合力与触觉信号支撑接触密集操作及真实科学实验任务。',
    links: [
      { type: 'arxiv', href: 'https://arxiv.org/abs/2609.27656' },
      { type: 'github', href: 'https://github.com/InternRobotics/InternW0' }
    ],
    status: 'preprint'
  },
  {
    slug: 'paper-robosnap',
    title:
      'RoboSnap: One-Shot Real-to-Sim Scene Generation for Generalizable Robot Learning and Evaluation',
    authors: [
      { name: 'Shujie Zhang' },
      { name: 'Jingkun Yi' },
      { name: 'Weipeng Zhong' },
      { name: 'Zirui Zhou' },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Hanqing Wang' },
      { name: 'Xudong Xu' },
      { name: 'Weinan Zhang' },
      { name: 'Chunhua Shen' }
    ],
    venue: 'CoRL 2026',
    year: '2026',
    type: 'conference',
    abstract:
      '从单张 RGB 图像生成可交互、可复用的仿真场景：以前景碰撞感知资产保证物理稳定性，以 3D Gaussian Splatting 保留背景视觉真实感，并发布覆盖 564 个真实场景的 DROID-Sim 数据集。',
    links: [
      { type: 'arxiv', href: 'https://arxiv.org/abs/2607.06699' },
      { type: 'website', href: 'https://robosnap.github.io' }
    ],
    status: 'accepted'
  },
  {
    slug: 'paper-internvla-a15',
    title:
      'InternVLA-A1.5: Unifying Understanding, Latent Foresight, and Action for Compositional Generalization',
    authors: [
      { name: 'Haoxiang Ma' },
      { name: 'Junhao Cai' },
      { name: 'Xiaoxu Xu' },
      { name: 'Hao Li' },
      { name: 'Yuyin Yang' },
      { name: 'Yang Tian' },
      { name: 'Jiafei Cao' },
      { name: 'Hongrui Zhu' },
      { name: 'Zherui Qiu' },
      { name: 'Zhaxizhuoma' },
      { name: 'Yuqiang Yang' },
      { name: 'Jiaqi Peng' },
      { name: 'Xueyuan Wei' },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Jiahao Jiang' },
      { name: 'Xing Gao' },
      { name: 'Hanqing Wang' },
      { name: 'Feng Yuan' },
      { name: 'Kailin Li' },
      { name: 'Xueyue Zhu' },
      { name: 'Tai Wang' },
      { name: 'Yan Ding' },
      { name: 'Jiangmiao Pang' },
      { name: 'Jia Zeng' },
      { name: 'Jingjing Zhang' },
      { name: 'Bowen Zhou' },
      { name: 'Yao Mu' },
      { name: 'Chunhua Shen' },
      { name: 'Weinan Zhang' }
    ],
    venue: 'ArXiv Technical Report',
    year: '2026',
    type: 'preprint',
    abstract:
      '在原生 VLM 语义能力上统一理解、潜空间前瞻与动作生成，通过冻结视频生成模型监督少量 foresight tokens，在不增加推理期视频分支的前提下增强组合泛化与长程任务执行。',
    links: [
      { type: 'arxiv', href: 'https://arxiv.org/abs/2607.04988' },
      { type: 'website', href: 'https://internrobotics.github.io/internvla-a15.github.io/' }
    ],
    status: 'preprint'
  },
  {
    slug: 'paper-st4vla',
    title: 'ST4VLA: Spatially Guided Training for Vision-Language-Action Models',
    authors: [
      { name: 'Jinhui Ye', isEqual: true },
      { name: 'Fangjing Wang', isEqual: true },
      { name: 'Ning Gao', isEqual: true },
      { name: 'Junqiu Yu', isEqual: true },
      { name: 'Yangkun Zhu', isMe: true },
      { name: 'Yilun Chen', role: 'corresponding' }
    ],
    venue: 'ICLR 2026',
    year: '2026',
    type: 'conference',
    abstract:
      '提出 Spatially Guided Training，将 spatial grounding pre-training 与 spatially guided action post-training 串联起来，在 SimplerEnv 上取得显著提升。',
    links: [{ type: 'arxiv', href: 'https://arxiv.org/abs/2602.10109' }],
    status: 'accepted'
  },
  {
    slug: 'paper-internvla-m1',
    title:
      'InternVLA-M1: A Spatially Guided Vision-Language-Action Framework for Generalist Robot Policy',
    authors: [
      { name: 'Yilun Chen', isCoreContributor: true },
      { name: 'Ning Gao', isCoreContributor: true },
      { name: 'Jiangmiao Pang', isCoreContributor: true },
      { name: 'Bolun Wang', isCoreContributor: true },
      { name: 'Fangjing Wang', isCoreContributor: true },
      { name: 'Jinhui Ye', isCoreContributor: true },
      { name: 'Junqiu Yu', isCoreContributor: true },
      { name: 'Jinyu Zhang', isCoreContributor: true },
      { name: 'Yangkun Zhu', isMe: true, isCoreContributor: true }
    ],
    authorsAlphabetical: true,
    venue: 'ArXiv Technical Report',
    year: '2025',
    type: 'preprint',
    abstract:
      '将空间 grounding 与机器人控制统一到同一框架，通过两阶段 spatially guided 训练提升 instruction following、泛化与长任务鲁棒性。',
    links: [
      { type: 'arxiv', href: 'https://arxiv.org/abs/2510.13778' },
      { type: 'github', href: 'https://github.com/InternRobotics/InternVLA-M1' },
      { type: 'model', href: 'https://huggingface.co/InternRobotics/InternVLA-M1' }
    ],
    status: 'preprint'
  },
  {
    slug: 'paper-internvla-a1',
    title: 'InternVLA-A1: Unifying Understanding, Generation and Action for Robotic Manipulation',
    authors: [
      { name: 'Junhao Cai' },
      { name: 'Yang Li' },
      { name: 'Haoxiang Ma' },
      { name: 'Jiangmiao Pang' },
      { name: 'Zherui Qiu' },
      { name: 'Yang Tian' },
      { name: 'Jia Zeng', role: 'project-leader' },
      { name: 'Hongrui Zhu' },
      { name: 'Yangkun Zhu', isMe: true }
    ],
    venue: 'ArXiv Technical Report',
    year: '2026',
    type: 'preprint',
    abstract:
      '统一 understanding、generation 与 action 的机器人操作模型，以 Mixture-of-Transformers 协同 scene understanding、visual foresight 和 action execution。',
    links: [{ type: 'arxiv', href: 'https://arxiv.org/abs/2601.02456' }],
    status: 'preprint'
  }
]
