import moment from 'moment'
import selectChildrens from './select/childrens'

export default class DateTool {
    constructor(setting) {
        const textKey = setting.textKey || 'text'
        const valueKey = setting.valueKey || 'value'
        
        const defaultSetting = {
            maxDate: false,
            minDate: false,
            yearSelected: {
                [textKey]: '請選擇',
                [valueKey]: null
            },
            monthSelected: {
                [textKey]: '請選擇',
                [valueKey]: null
            },
            daySelected: {
                [textKey]: '請選擇',
                [valueKey]: null
            },
        } 
        this.set = Object.assign({},defaultSetting,setting,{
            textKey: textKey,
            valueKey: valueKey,
        })
    }
    moment(value){
        return moment(value)
    }
    /**
     * @return {Object} Moment YYYY/MM/DD
     */
    getMomentValue(){
        return moment(`${this.set.yearSelected[this.set.valueKey]}/${this.set.monthSelected[this.set.valueKey]}/${this.set.daySelected[this.set.valueKey]}`)
    }
    /**
     * @param {*} setValue Object = {year,month,day}
     * @param {*} year {[textKey],[valueKey]}
     * @param {*} month {[textKey],[valueKey]}
     * @param {*} day {[textKey],[valueKey]}
     */
    setDateValue(setValue){
        const {year,month,day} = setValue
        const {textKey,valueKey} = this.set
        this.set.yearSelected = Object.assign(this.set.yearSelected,{
            [textKey]: year[textKey],
            [valueKey]: year[valueKey]
        }),
        this.set.monthSelected = Object.assign(this.set.monthSelected,{
            [textKey]: month[textKey],
            [valueKey]: month[valueKey]
        }),
        this.set.daySelected = Object.assign(this.set.daySelected,{
            [textKey]: day[textKey],
            [valueKey]: day[valueKey]
        })
    }
    
    select(){
        
        return {
            set: this.set,
            /**
             * @return {Array} Array {year,month,day}
             */
            getChildrens: ()=>{
                return selectChildrens(this.set)
            },
            /**
             * @return {Object} Object {year,month,day}
             */
            getSelected: ()=>{
                const {
                    yearSelected,
                    monthSelected,
                    daySelected
                } = this.set
                return {
                    year: yearSelected,
                    month: monthSelected,
                    day: daySelected,
                }
            },
            year: {
                childrens: selectChildrens(this.set).year,
                selected: this.set.yearSelected,
            },
            month: {
                childrens: selectChildrens(this.set).month,
                selected: this.set.monthSelected,
            },
            day: {
                childrens: selectChildrens(this.set).day,
                selected: this.set.daySelected,
            },
        }
    }
}