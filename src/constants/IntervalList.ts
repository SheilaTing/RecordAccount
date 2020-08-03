// object.freeze 保证数据的值和引用都不
const intervalList = Object.freeze(
    [{ text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" }
    ]
)

export default intervalList







