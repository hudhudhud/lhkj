<template>
    <section>
        <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
        <div class="time-selects" :style="item.inputStyle">
            <div class="time-select" @click='birthChoose'>
                <input type="text" placeholder="-年-" v-model='year' readonly>
                <img src="./img/select-arrow.png" alt="" class="arrow">
            </div>
            <div class="time-select" @click='birthChoose'>
                <input type="text" placeholder="-月-"  v-model='month' readonly>
                <img src="./img/select-arrow.png" alt="" class="arrow">
            </div>
            <div class="time-select" @click='birthChoose'>
                <input type="text" placeholder="-日-" v-model='day' readonly>
                <img src="./img/select-arrow.png" alt="" class="arrow">
            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="date"
            :startDate="item.startDate?new Date(item.startDate):new Date('1900-01-01')"
            :endDate="item.endDate?new Date(item.endDate):new Date()"
            @confirm="birthConfirm">
        </mt-datetime-picker>
    </section>
</template>
<script>
export default {
    props: ["item", "value"],
    data() {
        return {
            date: this.value,
        };
    },
    model: {
        prop: "value",
        event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
    },
    watch:{
        value:{
            handler(v){
                this.date=v
            },
            immediate:true,
        }
    },
    computed: {
        year () {
            if (this.date) { return new Date(this.date).getFullYear() }
            return ''
        },
        month () {
            if (this.date) { return new Date(this.date).getMonth() + 1 }
            return ''
        },
        day () {
            if (this.date) { return new Date(this.date).getDate() }
            return ''
        }
    },
    methods:{
        birthChoose () {
            this.$refs.picker.open()
            document.body.setAttribute('style', 'overflow:hidden')
        },
        birthConfirm (time) {
            this.$refs.picker.close()
            document.body.setAttribute('style', '')
            let res= (new Date(time)).toLocaleDateString()
            this.$emit("parent-event",res);
        }
    }
}
</script>
<style scoped lang='scss'>
 .time-selects{
    width:100%;
    height:.86rem;
    display: flex;
    justify-content: space-between;
    .time-select{
        position:relative;
        width:32%;
        input{
            position:absolute;
            width:100%;
            top:0;
            height:.86rem;
            border-radius: .1rem;
            font-size:.3rem;
            border:.02rem solid rgb(169,167,180);
            box-sizing: border-box;
            outline: none;
            line-height: .86rem;
            padding:0 .1rem;
        }
        img.arrow{
            position:absolute;
            right:.28rem;
            top:.34rem;
            width:.26rem;
            height:.18rem;
        }
    }
}
</style>