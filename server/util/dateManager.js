const dateManager = {};

dateManager.datesBetween = function(startDate, endDate){
    let sDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6)}`;
    let eDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6)}`;
    let cDate = sDate;
    let dates = [startDate];

    while(cDate !== eDate){
        let date = (new Date(cDate));
        let nextDay = new Date(date.setDate(date.getDate() + 1));
        let nextDayIso = nextDay.toISOString().replace(/[-:,TZ]/g, '');
        let newDate = nextDayIso.slice(0, nextDayIso.length - 10);
        dates.push(newDate);
        cDate = `${newDate.slice(0, 4)}-${newDate.slice(4, 6)}-${newDate.slice(6)}`;
        if(dates.length > 28) break;
    }
    return dates;
}

module.exports = dateManager;