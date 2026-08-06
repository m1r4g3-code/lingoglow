import type { ComprehensionPassage } from "../../types";

export const zhComprehension: ComprehensionPassage[] = [
  {
    id: "zh-comp-family",
    languageId: "zh",
    level: "A1",
    title: "我的家庭",
    text: "你好，我叫小美。我有一个大家庭。我爸爸叫王明，我妈妈叫李芳。我有一个哥哥和一个妹妹。我们的房子不大，但是很漂亮。早上我们喜欢吃面包和奶酪。",
    questions: [
      {
        prompt: "小美的爸爸叫什么名字？",
        choices: ["王明", "李芳", "小美", "张伟"],
        correctIndex: 0,
      },
      {
        prompt: "他们的房子怎么样？",
        choices: ["大但是丑", "不大但是很漂亮", "新但是很贵", "很旧"],
        correctIndex: 1,
      },
      {
        prompt: "早上他们喜欢吃什么？",
        choices: ["米饭和鱼", "鸡蛋和牛奶", "面包和奶酪", "水果"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "zh-comp-day",
    languageId: "zh",
    level: "A1",
    title: "我的一天",
    text: "我叫小龙。我每天七点起床。我喝咖啡，吃面包。星期一、星期二和星期三我去上班。晚上我和姐姐一起喝茶。我喜欢星期五，因为那天是休息日。",
    questions: [
      {
        prompt: "小龙每天几点起床？",
        choices: ["六点", "七点", "八点", "九点"],
        correctIndex: 1,
      },
      {
        prompt: "晚上他和谁一起喝茶？",
        choices: ["哥哥", "妈妈", "姐姐", "朋友"],
        correctIndex: 2,
      },
      {
        prompt: "他为什么喜欢星期五？",
        choices: ["因为是工作日", "因为是休息日", "因为天气冷", "因为是第一天"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "zh-comp-restaurant",
    languageId: "zh",
    level: "A2",
    title: "在餐厅",
    text: "我和朋友去一家餐厅。服务员给我们菜单。我想吃鸡肉和米饭，我的朋友想吃鱼。我们很渴，所以点了水。菜很好吃。最后，我们买单，用信用卡付钱。",
    questions: [
      {
        prompt: "说话的人想吃什么？",
        choices: ["鱼", "鸡肉和米饭", "奶酪", "水果"],
        correctIndex: 1,
      },
      {
        prompt: "他们点了什么喝的？",
        choices: ["咖啡", "牛奶", "水", "什么都没点"],
        correctIndex: 2,
      },
      {
        prompt: "他们怎么付钱？",
        choices: ["现金", "信用卡", "不付钱", "支票"],
        correctIndex: 1,
      },
    ],
  },
];
