import moment from 'moment'

function getMouthLength (maxDate,minDate,year,month) {
    if(maxDate.year() == minDate.year()){
        return maxDate.month() - minDate.month()
    }
    if(maxDate.year() == year){
        return maxDate.month() + 1
    }
    if(minDate.year() == year){
        return 12 - minDate.month()
    }
    if(year > minDate.year() && year < maxDate.year()){
        return 12
    }
    return 0
}

function rangeMonth (maxDate,minDate,year,month,day,index){
    if(maxDate.year() == year && minDate.year() == year && maxDate.month()+1 == month && minDate.month()+1 == month){
        return maxDate.date() - minDate.date()
    }
    if(maxDate.year() == year && maxDate.month()+1 == month){
        return maxDate.date()
    }
    if(minDate.year() == year && minDate.month()+1 == month){
        return index - minDate.date()
    }
    return index
}

function getDayLength (maxDate,minDate,year,month,day){
    switch (month){
        case 1 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 2 : return rangeMonth(maxDate,minDate,year,month,day, (year%4 == 0)?29:28 )
        case 3 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 4 : return rangeMonth(maxDate,minDate,year,month,day,30)
        case 5 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 6 : return rangeMonth(maxDate,minDate,year,month,day,30)
        case 7 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 8 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 9 : return rangeMonth(maxDate,minDate,year,month,day,30)
        case 10 : return rangeMonth(maxDate,minDate,year,month,day,31)
        case 11 : return rangeMonth(maxDate,minDate,year,month,day,30)
        case 12 : return rangeMonth(maxDate,minDate,year,month,day,31)
        default: return 0
    }
}


export default function (set){
    const {
        textKey,
        valueKey,
    } = set
    
    let yearLength = 0
    let monthLength,dayLength
    const maxDate = (moment(set.maxDate).isValid())? moment(set.maxDate):moment()
    const minDate = (moment(set.minDate).isValid())? moment(set.minDate):moment()
    
    yearLength = maxDate.year() - minDate.year() || 1
    monthLength = getMouthLength(maxDate,minDate,set.yearSelected[valueKey],set.monthSelected[valueKey])
    dayLength = getDayLength (maxDate,minDate,set.yearSelected[valueKey],set.monthSelected[valueKey],set.daySelected[valueKey])

    let yearArray = []
    let monthArray = [{
        [textKey]: set.monthSelected[textKey],
        [valueKey]: null,
        disabled: true,
    }]
    let dayArray = [{
        [textKey]: set.daySelected[textKey],
        [valueKey]: null,
        disabled: true,
    }]
    
    if(moment(set.maxDate).isValid()){
        for (let i = 0; i <= yearLength; i++) {
            yearArray[i] = {
                [textKey]: maxDate.year() - i + '年',
                [valueKey]: maxDate.year() - i
            }
        }
        yearArray.reverse()
    }else{
        for (let i = 0; i <= yearLength; i++) {
            yearArray[i] = {
                [textKey]: maxDate.year() - i + '年',
                [valueKey]: maxDate.year() - i
            }
        }
    }
    if(monthLength){
        if(minDate.year() == set.yearSelected[valueKey] || maxDate.year() == minDate.year()){
            monthArray = []
            for (let i = 0; i < monthLength; i++) {
                monthArray[i] = {
                    [textKey]: minDate.month() + i + 1 + '月',
                    [valueKey]: minDate.month() + i + 1
                }
            } 
        }else{
            monthArray = []
            for (let i = 0; i < monthLength; i++) {
                monthArray[i] = {
                    [textKey]: i + 1 + '月',
                    [valueKey]: i + 1
                }
            }
        }
    }
    if(dayLength){
        if(minDate.year() == set.yearSelected[valueKey] || (maxDate.year() == minDate.year() && maxDate.month() == minDate.month())){
            dayArray = []
            for (let i = 0; i < dayLength; i++) {
                dayArray[i] = {
                    [textKey]: minDate.date() + i + 1 + '月',
                    [valueKey]: minDate.date() + i + 1
                }
            } 
        }else{
            dayArray = []
            for (let i = 0; i < dayLength; i++) {
                dayArray[i] = {
                    [textKey]: i + 1 + '日',
                    [valueKey]: i + 1
                }
            }
        }
    }

    if(!monthArray.some(obj=>obj[valueKey] == set.monthSelected[valueKey])){
        set.monthSelected[textKey] = '請選擇'
        set.monthSelected[valueKey] = null
        set.daySelected[textKey] = '請選擇'
        set.daySelected[valueKey] = null
    }
    if(!dayArray.some(obj=>obj[valueKey] == set.daySelected[valueKey])){
        set.daySelected[textKey] = '請選擇'
        set.daySelected[valueKey] = null
    }
    
    return {
        year: yearArray,
        month: monthArray,
        day: dayArray,
    }
}