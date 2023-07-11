module.exports = (ms) => {
    const seconds = ~~(ms / 1000);
    const minutes = ~~(seconds / 60);
    const hours = ~~(minutes / 60);
    const days = ~~(hours / 24);
    return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60, };
};