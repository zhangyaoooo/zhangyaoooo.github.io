---
icon: pen-to-square
date: 1970-01-01
category:
  - 前端
# tag:
#  - 页面配置
#star: 1
#article: true
#cover: 
---
 
# Promise

> 1. 理解Promise A+规范的基本概念
> 2. 学会创建Promise
> 3. 学会针对Promise进行后续处理

<!-- more -->

笔记参考： [渡一教育](https://www.baidu.com/s?wd=%E6%B8%A1%E4%B8%80%E6%95%99%E8%82%B2)

## 总结图
多看

![alt text](assets/Promise/image.png)

## 邓哥的烦恼


邓哥心中有很多女神，他今天下定决心，要向这些女神表白，他认为，只要女神够多，根据概率学原理，总有一个会接收他



稳妥起见，邓哥决定使用**串行**的方式进行表白：先给第1位女神发送短信，然后等待女神的回应，如果成功了，就结束，如果失败了，则再给第2位女神发送短信，依次类推



![alt text](assets/Promise/image-1.png)



邓哥的女神一共有4位，名字分别是：李建国、王富贵、周聚财、刘人勇



发短信是一个重复性的劳动，邓哥是个程序员，因此决定用函数封装这个动作



```javascript
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name, onFulffiled, onRejected) {
  // 模拟 发送表白短信
  console.log(
    `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
  );
  console.log(`等待${name}回复......`);
  // 模拟 女神回复需要一段时间
  setTimeout(() => {
    // 模拟 有10%的几率成功
    if (Math.random() <= 0.1) {
      // 成功，调用 onFuffiled，并传递女神的回复
      onFulffiled(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
    } else {
      // 失败，调用 onRejected，并传递女神的回复
      onRejected(`${name} -> 邓哥：你是个好人😜`);
    }
  }, 1000);
}
```



有了这个函数后，邓哥于是开始编写程序发送短信了



```javascript
// 首先向 李建国 发送消息
sendMessage(
  '李建国',
  (reply) => {
    // 如果成功了，输出回复的消息后，结束
    console.log(reply);
  },
  (reply) => {
    // 如果失败了，输出回复的消息后，向 王富贵 发送消息
    console.log(reply);
    sendMessage(
      '王富贵',
      (reply) => {
        // 如果成功了，输出回复的消息后，结束
        console.log(reply);
      },
      (reply) => {
        // 如果失败了，输出回复的消息后，向 周聚财 发送消息
        console.log(reply);
        sendMessage(
          '周聚财',
          (reply) => {
            // 如果成功了，输出回复的消息后，结束
            console.log(reply);
          },
          (reply) => {
            // 如果失败了，输出回复的消息后，向 刘人勇 发送消息
            console.log(reply);
            sendMessage(
              '刘人勇',
              (reply) => {
                // 如果成功了，输出回复的消息后，结束
                console.log(reply);
              },
              (reply) => {
                // 如果失败了，就彻底没戏了
                console.log(reply);
                console.log('邓哥命犯天煞孤星，注定孤独终老！！');
              }
            );
          }
        );
      }
    );
  }
);
```



该程序完成后，邓哥内心是崩溃的



这一层一层的回调嵌套，形成了传说中的「**回调地狱 callback hell**」



邓哥是个完美主义者，怎么能忍受这样的代码呢？



要解决这样的问题，需要Promise出马



## Promise规范


Promise是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使异步代码更加清晰、简洁、统一



这套规范最早诞生于前端社区，规范名称为[Promise A+](https://promisesaplus.com/)



该规范出现后，立即得到了很多开发者的响应



Promise A+ 规定：



1.  所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个**对象**，该对象称之为**Promise对象**，也叫做任务对象 ![alt text](assets/Promise/image-2.png)
2.  每个任务对象，都应该有两个阶段、三个状态 ![alt text](assets/Promise/image-3.png)
根据常理，它们之间存在以下逻辑： 
    - 任务总是从未决阶段变到已决阶段，无法逆行
    - 任务总是从挂起状态变到完成或失败状态，无法逆行
    - 时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变
3.  `挂起->完成`，称之为`resolve`；`挂起->失败`称之为`reject`。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。  
![alt text](assets/Promise/image-4.png)
4.  可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected  
![alt text](assets/Promise/image-5.png)



## Promise API


ES6提供了一套API，实现了Promise A+规范



基本使用如下：



```javascript
// 创建一个任务对象，该任务立即进入 pending 状态
const pro = new Promise((resolve, reject) => {
  // 任务的具体执行流程，该函数会立即被执行
  // 调用 resolve(data)，可将任务变为 fulfilled 状态， data 为需要传递的相关数据
  // 调用 reject(reason)，可将任务变为 rejected 状态，reason 为需要传递的失败原因
});

pro.then(
  (data) => {
    // onFulfilled 函数，当任务完成后，会自动运行该函数，data为任务完成的相关数据
  },
  (reason) => {
    // onRejected 函数，当任务失败后，会自动运行该函数，reason为任务失败的相关原因
  }
);
```



## 邓哥的解决方案


学习了ES6的Promise后，邓哥决定对`sendMessage`函数进行改造，改造结果如下：



```javascript
// 向某位女生发送一则表白短信
// name: 女神的姓名
// 该函数返回一个任务对象
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 resolve，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 reject，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}
```



之后，就可以使用该函数来发送消息了



```javascript
sendMessage('李建国').then(
  (reply) => {
    // 女神答应了，输出女神的回复
    console.log(reply);
  },
  (reason) => {
    // 女神拒绝了，输出女神的回复
    console.log(reason);
  }
);
```



> 至此，回调地狱的问题仍然没能解决
>
>  
>
> 要解决回调地狱，还需要进一步学习Promise的知识
>

## Promise的链式调用

![alt text](assets/Promise/image-6.png)



## catch方法


`.catch(onRejected)` = `.then(null, onRejected)`



## 链式调用


![alt text](assets/Promise/image-7.png)

**!! 下面是重点**

_后续处理 就是 新任务的执行过程。_

1.  then方法必定会返回一个新的Promise  
可理解为`后续处理也是一个任务` 
2.  新任务的状态取决于后续处理： 
    -  若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据 
    -  若有后续处理但还未执行，新任务挂起。 
    -  若后续处理执行了，则根据后续处理的情况确定新任务的状态 
        * 后续处理执行无错，新任务的状态为完成（成功），数据为后续处理的返回值
        * 后续处理执行有错，新任务的状态为失败（失败），数据为异常对象
        * 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致



由于链式任务的存在，异步代码拥有了更强的表达力



```javascript
// 常见任务处理代码

/*
 * 任务成功后，执行处理1，失败则执行处理2
 */
pro.then(处理1).catch(处理2)

/*
 * 任务成功后，依次执行处理1、处理2
 */
pro.then(处理1).then(处理2)

/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```



## 邓哥的解决方案


```javascript
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

sendMessage('李建国')
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('王富贵');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('周聚财');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('刘人勇');
  })
  .then(
    (reply) => {
      // 成功，结束
      console.log(reply);
      console.log('邓哥终于找到了自己的伴侣');
    },
    (reply) => {
      // 最后一个也失败了
      console.log(reply);
      console.log('邓哥命犯天煞孤星，无伴终老，孤独一生');
    }
  );
```

## 邓哥的新问题


邓嫂出门时，给邓哥交待了几个任务：



1.  做饭  
可交给电饭煲完成 
2.  洗衣服  
可交给洗衣机完成 
3.  打扫卫生  
可交给扫地机器人完成 



邓哥需要在所有任务结束后给邓嫂汇报工作，哪些成功了，哪些失败了



为了最大程度的节约时间，邓哥希望这些任务同时进行，最终汇总结果统一处理



![alt text](assets/Promise/image-8.png)



每个任务可以看做是一个返回Promise的函数



```javascript
// 做饭
function cook() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了电饭煲');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('饭已ok');
      } else {
        reject('做饭却忘了加水，米饭变成了爆米花');
      }
    }, 2000);
  });
}

// 洗衣服
function wash() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了洗衣机');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('衣服已经洗好');
      } else {
        reject('洗衣服时停水了，洗了个寂寞');
      }
    }, 2500);
  });
}

// 打扫卫生
function sweep() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了扫地机器人');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('地板扫的非常干净');
      } else {
        reject('扫地机器人被哈士奇一爪掀翻了');
      }
    }, 3000);
  });
}
```



如何利用这三个函数实现邓哥的要求呢？



## Promise的静态方法
| 方法名 | 含义 |
| --- | --- |
| Promise.resolve(data) | 直接返回一个完成状态的任务 |
| Promise.reject(reason) | 直接返回一个拒绝状态的任务 |
| Promise.all(任务数组) | 返回一个任务   任务数组全部成功则成功   任何一个失败则失败 |
| Promise.any(任务数组) | 返回一个任务   任务数组任一成功则成功   任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务   任务数组全部已决则成功   该任务不会失败 |
| Promise.race(任务数组) | 返回一个任务   任务数组任一已决则已决，状态和其一致 |
| | |




## 邓哥的解决方案


```javascript
Promise.allSettled([cook(), wash(), sweep()]).then((result) => {
  // 处理汇总结果
  const report = result
    .map((r) => (r.status === 'fulfilled' ? r.value : r.reason))
    .join(';');
  console.log(report);
});
```



