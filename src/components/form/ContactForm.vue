<script setup>
import { computed, reactive, ref } from 'vue'
import { site } from '@/data/site'
import BaseIcon from '@/components/common/BaseIcon.vue'

/**
 * 纯静态留言表单：
 * 只做前端校验与成功提示，不发送任何网络请求。
 * 如需真正收信，可后续接入 Formspree 等服务（见 README）。
 */
const form = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  type: '校园数字平台建设',
  message: ''
})

const touched = reactive({})
const submitted = ref(false)
const failCount = ref(0)

const typeOptions = [
  '校园数字平台建设',
  '智慧校园解决方案',
  '教育内容产品',
  '定制软件开发',
  '运维与技术支持',
  '其他合作意向'
]

const RULES = {
  name: (v) => {
    if (!v.trim()) return '请填写您的姓名'
    if (v.trim().length < 2) return '姓名至少 2 个字'
    if (v.trim().length > 20) return '姓名过长，请精简'
    return ''
  },
  phone: (v) => {
    if (!v.trim()) return '请填写联系电话'
    const ok = /^1[3-9]\d{9}$/.test(v.trim()) || /^0\d{2,3}-?\d{7,8}$/.test(v.trim())
    return ok ? '' : '请填写正确的手机号或座机号'
  },
  email: (v) => {
    if (!v.trim()) return ''
    return /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(v.trim()) ? '' : '邮箱格式不正确'
  },
  message: (v) => {
    if (!v.trim()) return '请简单描述您的需求'
    if (v.trim().length < 5) return '请至少填写 5 个字，便于我们判断'
    if (v.trim().length > 500) return '内容过长，请控制在 500 字以内'
    return ''
  }
}

const errors = computed(() => {
  const result = {}
  Object.keys(RULES).forEach((key) => {
    result[key] = RULES[key](form[key] || '')
  })
  return result
})

const isValid = computed(() => Object.values(errors.value).every((msg) => !msg))

function showError(key) {
  return touched[key] && errors.value[key]
}

function onBlur(key) {
  touched[key] = true
}

function onSubmit() {
  Object.keys(RULES).forEach((key) => {
    touched[key] = true
  })

  if (!isValid.value) {
    failCount.value += 1
    // 滚动到第一个错误项，方便用户定位
    const firstKey = Object.keys(errors.value).find((key) => errors.value[key])
    if (firstKey) {
      const el = document.getElementById(`field-${firstKey}`)
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      el?.querySelector('input, textarea')?.focus({ preventScroll: true })
    }
    return
  }

  submitted.value = true
}

function resetForm() {
  Object.keys(form).forEach((key) => {
    if (key === 'type') {
      form.type = typeOptions[0]
      return
    }
    form[key] = ''
  })
  Object.keys(touched).forEach((key) => {
    touched[key] = false
  })
  failCount.value = 0
  submitted.value = false
}
</script>

<template>
  <div class="contact-form card card--flat">
    <!-- 提交成功态 -->
    <div v-if="submitted" class="success">
      <span class="success__icon">
        <BaseIcon name="check" :size="30" />
      </span>
      <h3 class="success__title">信息已记录，感谢您的信任！</h3>
      <p class="success__text">
        本表单为静态演示，内容不会自动发送到我们的邮箱。为确保我们能及时收到您的需求，
        请直接拨打 <a class="success__link" :href="`tel:${site.contact.phoneRaw}`">{{ site.contact.phone }}</a>
        或发送邮件至
        <a class="success__link" :href="`mailto:${site.contact.email}`">{{ site.contact.email }}</a>。
      </p>
      <button class="btn btn--ghost" type="button" @click="resetForm">重新填写</button>
    </div>

    <!-- 表单 -->
    <form v-else class="form" novalidate @submit.prevent="onSubmit">
      <h3 class="form__title">在线留言</h3>
      <p class="form__note">
        填写后我们会尽快与您联系。<span class="form__required">*</span> 为必填项。
      </p>

      <div class="form__row">
        <div id="field-name" class="field">
          <label class="field__label" for="f-name">姓名 <span class="form__required">*</span></label>
          <input
            id="f-name"
            v-model="form.name"
            class="field__input"
            :class="{ 'is-error': showError('name') }"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="请输入您的姓名"
            @blur="onBlur('name')"
          />
          <p v-if="showError('name')" class="field__error">{{ errors.name }}</p>
        </div>

        <div id="field-phone" class="field">
          <label class="field__label" for="f-phone">联系电话 <span class="form__required">*</span></label>
          <input
            id="f-phone"
            v-model="form.phone"
            class="field__input"
            :class="{ 'is-error': showError('phone') }"
            type="tel"
            name="phone"
            autocomplete="tel"
            placeholder="手机号或座机号"
            @blur="onBlur('phone')"
          />
          <p v-if="showError('phone')" class="field__error">{{ errors.phone }}</p>
        </div>
      </div>

      <div class="form__row">
        <div id="field-email" class="field">
          <label class="field__label" for="f-email">电子邮箱</label>
          <input
            id="f-email"
            v-model="form.email"
            class="field__input"
            :class="{ 'is-error': showError('email') }"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="选填，便于我们发送方案"
            @blur="onBlur('email')"
          />
          <p v-if="showError('email')" class="field__error">{{ errors.email }}</p>
        </div>

        <div id="field-company" class="field">
          <label class="field__label" for="f-company">单位/院校名称</label>
          <input
            id="f-company"
            v-model="form.company"
            class="field__input"
            type="text"
            name="company"
            autocomplete="organization"
            placeholder="选填"
          />
        </div>
      </div>

      <div class="field">
        <label class="field__label" for="f-type">需求类型</label>
        <select id="f-type" v-model="form.type" class="field__input" name="type">
          <option v-for="opt in typeOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <div id="field-message" class="field">
        <label class="field__label" for="f-message">需求描述 <span class="form__required">*</span></label>
        <textarea
          id="f-message"
          v-model="form.message"
          class="field__input field__input--area"
          :class="{ 'is-error': showError('message') }"
          name="message"
          rows="5"
          maxlength="500"
          placeholder="例如：我们是一所职业院校，希望把请假、报修和活动报名整合到一个小程序里。"
          @blur="onBlur('message')"
        />
        <div class="field__foot">
          <p v-if="showError('message')" class="field__error">{{ errors.message }}</p>
          <span class="field__counter">{{ form.message.length }} / 500</span>
        </div>
      </div>

      <p v-if="failCount" class="form__alert" role="alert">
        <BaseIcon name="alert" :size="16" />
        还有必填项未正确填写，请检查标红的字段。
      </p>

      <button class="btn btn--primary btn--lg btn--block" type="submit">提交留言</button>

      <p class="form__tip">
        提交即表示同意我们通过您留下的联系方式与您沟通。我们不会将信息用于其他用途。
      </p>
    </form>
  </div>
</template>

<style scoped>
.contact-form {
  padding: var(--sp-6);
  background: #fff;
}

.form__title {
  font-size: var(--fs-lg);
}

.form__note {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
}

.form__required {
  color: var(--brand-red);
}

.form,
.success {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.form__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-5);
}

.field {
  display: flex;
  flex-direction: column;
}

.field__label {
  margin-bottom: 8px;
  color: var(--ink-2);
  font-size: var(--fs-sm);
  font-weight: 600;
}

.field__input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: #fdfefe;
  color: var(--ink);
  font-size: var(--fs-sm);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease),
    background-color var(--dur) var(--ease);
}

.field__input::placeholder {
  color: var(--text-light);
}

.field__input:focus {
  outline: none;
  border-color: var(--brand-blue);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(29, 78, 158, 0.12);
}

.field__input.is-error {
  border-color: var(--danger);
  background: #fffafa;
}

.field__input.is-error:focus {
  box-shadow: 0 0 0 3px rgba(214, 69, 69, 0.12);
}

.field__input--area {
  resize: vertical;
  min-height: 120px;
  line-height: 1.8;
}

.field__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 6px;
}

.field__error {
  margin-top: 6px;
  color: var(--danger);
  font-size: var(--fs-xs);
}

.field__foot .field__error {
  margin-top: 0;
}

.field__counter {
  margin-left: auto;
  color: var(--text-light);
  font-size: var(--fs-xs);
  font-variant-numeric: tabular-nums;
}

.form__alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--radius);
  background: var(--brand-red-soft);
  color: var(--brand-red-dark);
  font-size: var(--fs-sm);
}

.form__tip {
  color: var(--text-light);
  font-size: var(--fs-xs);
  line-height: 1.8;
}

/* ---------- 成功态 ---------- */
.success {
  align-items: flex-start;
  padding: var(--sp-5) 0;
}

.success__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(18, 168, 112, 0.12);
  color: var(--success);
}

.success__title {
  font-size: var(--fs-lg);
}

.success__text {
  color: var(--text-muted);
  font-size: var(--fs-sm);
  line-height: 1.95;
}

.success__link {
  color: var(--brand-blue);
  font-weight: 600;
  word-break: break-all;
}

.success__link:hover {
  text-decoration: underline;
}

@media (min-width: 700px) {
  .form__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-form {
    padding: var(--sp-7);
  }
}
</style>
