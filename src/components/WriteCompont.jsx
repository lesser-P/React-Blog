import { useState } from 'react'
import { Card } from 'antd'
import '../css/writeComp.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const list = [
  {
    id: 0,
    title: 'react',
    cotntext:
      '你想知道宇宙从何⽽来吗？你想知道宇宙是由什么组成的吗？你想知道宇宙最终会如何吗？你想知道时间和空间从何⽽来吗？你想了解我们在宇宙中是否孤单吗？很遗憾！这本书不会告诉你任何答案。相反，这本书写的全都是宇宙中我们不知道的事情。你可能以为这些重⼤问题的答案科学家已经知道了，但事实并⾮如此。我们时常会听到这样的新闻：某个重⼤的发现回答了有关宇宙的⼀个深刻问题。但是有多少⼈在此之前就知道这些问题呢？还有多少重⼤问题还没有答案？这就是我们写这本书的⽬的，我们想给你介绍⼀下这些悬⽽未决的问题',
  },
  {
    id: 1,
    title: 'redis',
    cotntext:
      '你想知道宇宙从何⽽来吗？你想知道宇宙是由什么组成的吗？你想知道宇宙最终会如何吗？你想知道时间和空间从何⽽来吗？你想了解我们在宇宙中是否孤单吗？很遗憾！这本书不会告诉你任何答案。相反，这本书写的全都是宇宙中我们不知道的事情。你可能以为这些重⼤问题的答案科学家已经知道了，但事实并⾮如此。我们时常会听到这样的新闻：某个重⼤的发现回答了有关宇宙的⼀个深刻问题。但是有多少⼈在此之前就知道这些问题呢？还有多少重⼤问题还没有答案？这就是我们写这本书的⽬的，我们想给你介绍⼀下这些悬⽽未决的问题',
  },
  {
    id: 2,
    title: 'solidity',
    cotntext:
      '你想知道宇宙从何⽽来吗？你想知道宇宙是由什么组成的吗？你想知道宇宙最终会如何吗？你想知道时间和空间从何⽽来吗？你想了解我们在宇宙中是否孤单吗？很遗憾！这本书不会告诉你任何答案。相反，这本书写的全都是宇宙中我们不知道的事情。你可能以为这些重⼤问题的答案科学家已经知道了，但事实并⾮如此。我们时常会听到这样的新闻：某个重⼤的发现回答了有关宇宙的⼀个深刻问题。但是有多少⼈在此之前就知道这些问题呢？还有多少重⼤问题还没有答案？这就是我们写这本书的⽬的，我们想给你介绍⼀下这些悬⽽未决的问题',
  },
  {
    id: 3,
    title: 'solidity',
    cotntext:
      '你想知道宇宙从何⽽来吗？你想知道宇宙是由什么组成的吗？你想知道宇宙最终会如何吗？你想知道时间和空间从何⽽来吗？你想了解我们在宇宙中是否孤单吗？很遗憾！这本书不会告诉你任何答案。相反，这本书写的全都是宇宙中我们不知道的事情。你可能以为这些重⼤问题的答案科学家已经知道了，但事实并⾮如此。我们时常会听到这样的新闻：某个重⼤的发现回答了有关宇宙的⼀个深刻问题。但是有多少⼈在此之前就知道这些问题呢？还有多少重⼤问题还没有答案？这就是我们写这本书的⽬的，我们想给你介绍⼀下这些悬⽽未决的问题',
  },
  {
    id: 4,
    title: 'solidity',
    cotntext:
      '你想知道宇宙从何⽽来吗？你想知道宇宙是由什么组成的吗？你想知道宇宙最终会如何吗？你想知道时间和空间从何⽽来吗？你想了解我们在宇宙中是否孤单吗？很遗憾！这本书不会告诉你任何答案。相反，这本书写的全都是宇宙中我们不知道的事情。你可能以为这些重⼤问题的答案科学家已经知道了，但事实并⾮如此。我们时常会听到这样的新闻：某个重⼤的发现回答了有关宇宙的⼀个深刻问题。但是有多少⼈在此之前就知道这些问题呢？还有多少重⼤问题还没有答案？这就是我们写这本书的⽬的，我们想给你介绍⼀下这些悬⽽未决的问题',
  },
]

const WriteInfo = ({ item, onClickNavigate }) => {
  return (
    <Link to='/markdown' style={{ textDecoration: 'none' }}>
      <div className='context' onClick={onClickNavigate}>
        <div className='writeItem'>
          <Card hoverable='true' title={<h2>{item.title}</h2>} extra={<a href='#'>详情</a>} style={{ width: '100%' }}>
            <p className='custom-text'>{item.cotntext}</p>
          </Card>
        </div>
      </div>
    </Link>
  )
}

function WriteCompont() {
  return (
    <>
      <div className='writebody'>
        <div className='writeTitle'>
          <h1>随笔记录</h1>
          {list.map((item) => (
            <WriteInfo key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}
export default WriteCompont
