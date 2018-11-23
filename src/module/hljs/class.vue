<template>
    <div>
        <div>
            <h1>Class，详见console</h1>
<pre v-hljs>
    <code > 
    export class example {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(x, y) {
            return x+y;
        }
    }

    export class calc extends example {
        constructor(x,y) {
            super(x,y); // 子类构造函数必须使用super调用父类的构造函数;
            this.z = x+y;
        }
        mul(x,y) {
            return x*y
        }
    }

<h2> 运行 </h2>

    let myClass = new calc(10, 56);
    console.log('myClass', myClass);

    let add = myClass.add(200, 89)
    console.log('myClass', add);
    </code>
</pre>
</div>

<pre v-hljs>
    <code class="html"> 
            <h1>LALAL</h1>
    </code>
</pre>
    </div>
</template>
<script>
import { calc } from '../../utils/class_example.js';
export default {
    data() {
        return {

        }
    },
    mounted() {

        let myClass = new calc(10, 56);
        console.log('myClass', myClass);

        let add = myClass.add(200, 89)
        console.log('myClass', add);

        this.htmlToText();

    },
    methods: {
        htmlToText() {
            var $code = document.getElementsByClassName("html");
            for (var i = 0; i < $code.length; i++) {
                var element = $code[i];
                element.innerText = element.innerHTML;
            }
        }
    },
    computed: {

    }
}
</script>
<style lang="less">
</style>

