//保存本地
export const setItem = (name, value) => {
    //value是否为对象
    if (typeof value === "object") {
        value = JSON.stringify(value)
    }
    localStorage.setItem(name, value)
}
//获取本地
export const getItem = (name) => {
    let data = localStorage.getItem(name)
    if (typeof localStorage.getItem(name) === 'string') {
        return data
    } else {
        return JSON.parse(data)
    }
}
//清空对应本地
export const removeItem = (name) => {
    localStorage.removeItem(name)
}