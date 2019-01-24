## Range
范围滑块, 支持v-model

### 基本使用
``` javascript
{
    data(){
        return {
            value1: 10,
            value2: 6,
            value3: 2,
            value4: 10,
        }
    },
}
```

``` html
<!-- 默认 -->
<h4 class="fill gutter-top">默认最大值100, 最小值0, 当前:
    <span class="text-primary">{{value1}}</span>
</h4>
<a-range v-model="value1">
    <h4 style="word-break: keep-all;white-space: nowrap;" class="fill bg-white">✈️ 起飞</h4>
</a-range>

<!-- has-dots -->
<h4 class="fill gutter-top">最大值20, 最小值10, 显示断点, 当前:
    <span class="text-primary">{{value2}}</span>
</h4>
<a-range v-model="value2" :has-dots="true" :min="10" :max="20"/>

<!-- step -->
<h4 class="fill gutter-top">最大值8, 最小值0, 每一步2, 当前:
    <span class="text-primary">{{value3}}</span>
</h4>
<a-range v-model="value3" :has-dots="true" :min="0" :max="6" :step="2"/>

<!-- 自定义把手 -->
<h4 class="fill gutter-top">自定义把手样式, 当前:
    <span class="text-primary">{{value4}}</span>
</h4>
<a-range v-model="value4">
    <div slot="handler" class="fill-sm text-white flex align-items-center" style="background: rgba(0,0,0,0.1); word-break: keep-all;white-space: nowrap;"><a-icon class="text-primary" name="star-half" /></div></div>
</a-range>
```

### API

##### props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |是否必选
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 当前值 | `String` / `Number` | - |-|是|
| min | 最小值 | `String` / `Number` | 0 |-|否|
| max | 最小值 | `String` / `Number` | 100 |-|否|
| step | 步长 | `String` / `Number` | 1 |-|否|
| hasDots | 每间隔1步长, 增加一个刻度点 | `String` / `Number` | 1 |-|否|



##### events

| 名称 | 说明 | 参数 | 参数类型|
|-----------|-----------|-----------|-----------|
| chnage | 返回当前值 |  当前选中值 |`String` / `Number`|
| input | 返回当前值 |  当前选中值 |`String` / `Number`|