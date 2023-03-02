
export function formatDate(timestamp) {
    const d = new Date(timestamp);

    const hour = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();

    return `${leadZero(hour)}:${leadZero(min)}:${leadZero(sec)}`;
}

function leadZero(n) {
    return n >= 10 ? n : '0' + n;
}

export function classes(base, classMap) {
    let className = base;

    for (let extClass of Object.keys(classMap)) {
        if (classMap[extClass] === true) {
            className += ` ${extClass}`;
        }
    }

    return className;
}