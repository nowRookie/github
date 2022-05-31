<template>
  <div class="bgf container_input">
    <el-form
      :model="formData"
      ref="formRef"
      :label-width="labelWidth || '100px'"
      :inline="false"
      label-position="right"
    >
      <el-row>
        <el-col
          :span="item.span || span"
          class="unit"
          v-for="item in items"
          :key="item.key"
        >
          <!-- fee：金额(只能正数，喊正小数) -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'fee'"
          >
            <div class="row" style="width: 100%">
              <el-input
                style="flex: 1"
                :maxlength="item.maxlength || 15"
                :value="formData[item.key]"
                @input="(val) => triggerInputFee(item, val)"
                :placeholder="item.placeholder || `请输入${item.title}`"
                @change="(val) => inputChange(item, val)"
                autocomplete="off"
                :disabled="disabled || item.disabled"
                clearable
              ></el-input>
              <span v-if="item.after" class="ml5 w50px tc">{{
                item.after
              }}</span>
            </div>
          </el-form-item>
          <!-- int：只能是正整数 -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'int'"
          >
            <div class="row" style="width: 100%">
              <el-input
                style="flex: 1"
                :maxlength="item.maxlength || 15"
                :value="formData[item.key]"
                @input="(val) => triggerInputInt(item, val)"
                :placeholder="item.placeholder || `请输入${item.title}`"
                @change="(val) => inputChange(item, val)"
                autocomplete="off"
                :disabled="disabled || item.disabled"
                clearable
              ></el-input>
              <span v-if="item.after" class="ml5 w50px tc">{{
                item.after
              }}</span>
            </div>
          </el-form-item>
          <!-- decimal：正负小数 -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'decimal'"
          >
            <div class="row" style="width: 100%">
              <el-input
                style="flex: 1"
                v-model="formData[item.key]"
                :maxlength="item.maxlength || 15"
                @input="(val) => triggerInputDecimal(item, val)"
                :placeholder="item.placeholder || `请输入${item.title}`"
                @change="(val) => inputChange(item, val)"
                autocomplete="off"
                :disabled="disabled || item.disabled"
                clearable
              ></el-input>
              <span v-if="item.after" class="ml5 w50px tc">{{
                item.after
              }}</span>
            </div>
          </el-form-item>
          <!-- text -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="!item.type || item.type == 'text' || item.type == 'password'"
          >
            <div class="row">
              <el-input
                style="flex: 1"
                v-model="formData[item.key]"
                :maxlength="item.maxlength || 50"
                :placeholder="item.placeholder || `请输入${item.title}`"
                :show-password="item.type == 'password' ? true : false"
                :type="item.type"
                @change="(val) => inputChange(item, val)"
                autocomplete="off"
                :disabled="disabled || item.disabled"
                clearable
              ></el-input>
              <span v-if="item.after" class="ml5 w50px">{{ item.after }}</span>
            </div>
          </el-form-item>
          <!-- inputsNumber -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'inputsNumber'"
          >
            <el-input-number
              v-model="formData[item.key]"
              @change="(val) => inputChange(item, val)"
              autocomplete="off"
              :min="item.min || 1"
              :max="item.max"
              :step="item.step || 1"
              :disabled="disabled || item.disabled"
              clearable
            ></el-input-number>
          </el-form-item>
          <!-- number -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateNumber, trigger: 'change' },
                    { validator: validateNumber, trigger: 'blur' },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateNumber, trigger: 'change' },
                    { validator: validateNumber, trigger: 'blur' },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'number'"
          >
            <el-input
              v-model="formData[item.key]"
              :placeholder="item.placeholder || `请输入${item.title}`"
              @change="(val) => inputChange(item, val)"
              autocomplete="off"
              :disabled="disabled || item.disabled"
              clearable
            ></el-input>
          </el-form-item>
          <!-- textarea -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'textarea'"
          >
            <el-input
              type="textarea"
              v-model="formData[item.key]"
              :placeholder="item.placeholder || `请输入${item.title}`"
              :rows="item.rows || 5"
              :maxlength="item.maxlength || 150"
              resize="none"
              @change="(val) => inputChange(item, val)"
              autocomplete="off"
              :disabled="disabled || item.disabled"
            ></el-input>
          </el-form-item>
          <!-- select -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'select'"
          >
            <el-select
              :disabled="disabled || item.disabled"
              clearable
              filterable
              value-key="value"
              @change="(val) => selectChange(item, val)"
              v-model="formData[item.key]"
              :placeholder="`请选择${item.title}`"
              style="width: 100%"
            >
              <el-option
                v-for="unit in item.dataList"
                :key="unit.key"
                :label="unit.label"
                :value="unit"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- mulSelect -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'mulSelect'"
          >
            <el-select
              :disabled="disabled || item.disabled"
              clearable
              filterable
              multiple
              value-key="value"
              @change="(val) => selectChange(item, val)"
              v-model="formData[item.key]"
              :placeholder="`请选择${item.title}`"
              style="width: 100%"
            >
              <el-option
                v-for="unit in item.dataList"
                :key="unit.key"
                :label="unit.label"
                :value="unit"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- autocomplete -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'autocomplete'"
          >
            <el-select
              v-model="formData[item.key]"
              :disabled="disabled || item.disabled"
              filterable
              clearable
              remote
              :loading="item.loading"
              :remote-method="
                (query) => {
                  remoteMethod(item, query)
                }
              "
              value-key="value"
              :placeholder="`请选择${item.title}`"
              style="width: 100%"
            >
              <el-option
                v-for="unit in item.dataList"
                :key="unit.key"
                :label="unit.label"
                :value="unit"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- mulDate -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    },
                    { validator: validateMulDateRequire }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    },
                    { validator: validateMulDateRequire }
                  ]
                : []
            "
            v-else-if="item.type == 'mulDate'"
          >
            <el-col :span="11">
              <el-date-picker
                :disabled="disabled || item.disabled"
                type="date"
                placeholder="开始日期"
                v-model="formData[item.key].start"
                :picker-options="{
                  disabledDate(date) {
                    return startDateOptions(date, item.key)
                  }
                }"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="tc line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                :disabled="disabled || item.disabled"
                type="date"
                placeholder="结束日期"
                v-model="formData[item.key].end"
                :picker-options="{
                  disabledDate(date) {
                    return endDateOptions(date, item.key)
                  }
                }"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- date -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'blur'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'blur'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'date'"
          >
            <el-date-picker
              :disabled="disabled || item.disabled"
              :type="item.dateType || 'date'"
              :placeholder="`选择${item.title}`"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="formData[item.key]"
              @change="
                (val) => {
                  datePickerChange(item, val)
                }
              "
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <!-- checkbox -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'checkbox'"
          >
            <el-checkbox-group
              v-model="formData[item.key]"
              :disabled="disabled || item.disabled"
            >
              <el-checkbox
                v-for="(unit, index) in item.dataList"
                :disabled="unit.disabled"
                :key="index"
                :label="unit.value"
                :name="item.key"
                >{{ unit.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <!-- radio -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'radio'"
          >
            <el-radio-group
              v-model="formData[item.key]"
              :disabled="disabled || item.disabled"
              @change="(val) => switchChange(item, val)"
            >
              <el-radio
                v-for="(unit, index) in item.dataList"
                :disabled="unit.disabled"
                :key="index"
                :label="unit.value"
                >{{ unit.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- switch -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'switch'"
          >
            <el-switch
              v-model="formData[item.key]"
              :disabled="disabled || item.disabled"
              @change="(val) => switchChange(item, val)"
            ></el-switch>
          </el-form-item>
          <!-- uploadFile -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'uploadFile'"
          >
            <el-upload
              class="upload-demo"
              :multiple="item.limit == 1 ? false : true"
              :ref="item.key"
              :disabled="disabled || item.disabled"
              :limit="item.limit || 5"
              :accept="item.accept"
              :action="item.action ? item.action : ''"
              :name="item.name || 'file'"
              :data="item.params || {}"
              :list-type="item.listType ? item.listType : 'text'"
              :on-change="
                (file, fileList) => {
                  handleChange(item, file, fileList)
                }
              "
              :on-error="
                (file, fileList) => {
                  handleError(item, file, fileList)
                }
              "
              :before-upload="beforeUpload"
              :on-remove="
                (file, fileList) => {
                  handleRemove(item, file, fileList)
                }
              "
              :on-preview="
                (file) => {
                  handlePrevie(item, file)
                }
              "
              :file-list="formData[item.key]"
              :auto-upload="false"
            >
              <i
                class="el-icon-plus"
                slot="trigger"
                v-if="item.listType == 'picture-card'"
              ></i>
              <el-button
                slot="trigger"
                size="small"
                type="primary"
                :disabled="disabled || item.disabled"
                v-else
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                {{ item.options ? item.options.tip : '' }}
              </div>
            </el-upload>
          </el-form-item>
          <!-- autoupload -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'autoupload'"
          >
            <el-upload
              :class="[
                'upload-demo',
                disabled || item.disabled ? 'disabled' : ''
              ]"
              :multiple="item.limit == 1 ? false : true"
              :ref="item.key"
              :disabled="disabled || item.disabled"
              :limit="item.limit || 5"
              :accept="item.accept"
              :headers="item.headers"
              :action="item.action ? api + item.action : ''"
              :name="item.name || 'file'"
              :data="item.params || {}"
              :list-type="item.listType ? item.listType : 'text'"
              :on-success="
                (response, file, fileList) => {
                  handleSuccess(item, file, fileList)
                }
              "
              :on-error="
                (err, file, fileList) => {
                  handleError(item, file, fileList)
                }
              "
              :before-upload="beforeUpload"
              :on-remove="
                (file, fileList) => {
                  handleRemove(item, file, fileList)
                }
              "
              :on-preview="
                (file) => {
                  handlePrevie(item, file)
                }
              "
              :on-exceed="fileExceed"
              :file-list="formData[item.key]"
              :auto-upload="true"
            >
              <i
                class="el-icon-plus"
                slot="trigger"
                v-if="item.listType == 'picture-card'"
              ></i>
              <el-button
                slot="trigger"
                size="small"
                type="primary"
                :disabled="disabled || item.disabled"
                v-else
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                {{ item.options ? item.options.tip : '' }}
              </div>
            </el-upload>
          </el-form-item>
          <!-- area省/市/区 -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      validator: (rule, value, callback) =>
                        validateCascader(rule, value, callback, item)
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'area'"
          >
            <el-cascader
              ref="cascaderAddr"
              :size="item.size"
              :options="item.dataList || regionData"
              clearable
              :disabled="disabled || item.disabled"
              placeholder="请选择:省 / 市 / 区"
              v-model="formData[item.key].area"
              @change="
                (arr) => {
                  handleAddressFun(item, arr)
                }
              "
            ></el-cascader>
            <el-input
              v-if="item.detail"
              v-model="formData[item.key].detail"
              placeholder="详细地址"
              clearable
              :disabled="disabled || item.disabled"
              style="margin-top: 10px"
            ></el-input>
          </el-form-item>
          <!-- tree -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请选择${item.title}`,
                      trigger: 'change'
                    }
                  ]
                : []
            "
            v-else-if="item.type == 'tree'"
          >
            <el-tree
              :ref="item.key"
              :data="formData[item.key].data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="item.default_expanded_keys"
              :default-checked-keys="item.default_checked_keys"
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
          <!-- component -->
          <el-form-item
            :class="item.hide ? 'hide' : 'block h40px'"
            :label-width="item.labelWidth || labelWidth"
            :label="item.title"
            :prop="item.key"
            :required="item.required"
            :rules="
              item.rules
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ].concat(item.rules)
                : item.required
                ? [
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'change'
                    },
                    {
                      required: true,
                      message: `请输入${item.title}`,
                      trigger: 'blur'
                    },
                    { validator: validateTrim, trigger: 'blur' }
                  ]
                : []
            "
            v-if="item.type == 'component'"
          >
            <div class="row">
              <component
                style="flex: 1"
                :is="item.component"
                v-model="formData[item.key]"
                v-bind="item"
              ></component>
              <span v-if="item.after" class="ml5 w50px">{{ item.after }}</span>
            </div>
          </el-form-item>
          <slot v-else-if="item.type == 'slot'" :name="item.key"></slot>
        </el-col>
        <el-col v-if="!content" :span="6">
          <div class="pl20 mb10">
            <el-button type="primary" @click="ok">查询</el-button>
            <el-button type="primary" plain @click="reset"> 重置 </el-button>
          </div>
          <slot name="operate" :data="formData"></slot>
        </el-col>
      </el-row>
    </el-form>
    <!-- 预览图片弹窗 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
const api = process.env.VUE_APP_API_URL
export default {
  props: {
    span: {
      type: Number,
      default: 6
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    content: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    layout: {
      type: Array,
      default () {
        return [21, 3]
      }
    }
  },
  data () {
    const formData = {}
    ;(this.$props.items || []).forEach((item) => {
      if (
        item.type === 'checkbox' ||
        item.type === 'uploadFile' ||
        item.type === 'autoupload' ||
        item.type === 'mulSelect' ||
        item.valueType === Array
      ) {
        formData[item.key] = item.data ? item.data : []
      } else if (item.type === 'mulDate') {
        formData[item.key] = {}
        formData[item.key].start = item.data ? item.data.start : ''
        formData[item.key].end = item.data ? item.data.end : ''
      } else if (item.type === 'area') {
        formData[item.key] = {}
        formData[item.key].area = item.data ? item.data.area : []
        formData[item.key].detail = item.data ? item.data.detail : ''
      } else if (item.type === 'tree') {
        formData[item.key] = {}
        formData[item.key].type = 'tree'
        formData[item.key].data = item.data
      } else {
        formData[item.key] =
          item.data !== undefined && item.data !== null ? item.data : ''
      }
    })
    return {
      api,
      dialogVisible: false,
      dialogImageUrl: '',
      autouploadList: [],
      formData,
      regionData: [],
      // regionData: regionData,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    validateTrim (rule, value, callback) {
      const reg = /^\s+|\s+$/
      if (reg.test(value)) {
        callback(new Error('首尾不能为空格'))
      } else {
        callback()
      }
    },
    validateCascader (rule, value, callback, item) {
      if (!value.area || !value.area.length) {
        callback(new Error(`请选择${item.title}`))
      } else {
        callback()
      }
    },
    validatemulDateRequire (rule, value, callback) {
      if (value.start === '') {
        callback(new Error('开始日期不能为空'))
      } else if (value.end === '') {
        callback(new Error('结束日期不能为空'))
      } else {
        callback()
      }
    },
    validateNumber (rule, value, callback) {
      const reg = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字,不超过5位小数！'))
      }
    },
    triggerInputFee (item, val) {
      const bit = item.bit || 4
      this.formData[item.key] = String(val)
        .replace(/[^\d.]|^\./g, '') // 只能填数字或者小数点
        .replace(/\.{2}/g, '.') // 不能连续填2个小数点
        .replace(/^0+$/, '0') // 全部填写0时只显示一个0
        .replace(/^0(\d{1})/g, '$1') // 以0开头的整数，只展示整数部分
        // .replace(/^([1-9]\d*|0)(\.\d{1,4})(\.|\d{1})?$/, '$1$2')
        .replace(
          new RegExp('^([1-9]\\d*|0)(\\.\\d{1,' + bit + '})(.|\\d{1})?$'),
          '$1$2'
        )
    },
    triggerInputInt (item, val) {
      this.formData[item.key] = String(val)
        .replace(/[^\d]/g, '') // 只能填数字
        .replace(/^0+$/, '0') // 全部填写0时只显示一个0
        .replace(/^0(\d{1})/g, '$1') // 以0开头的整数，只展示整数部分;
    },
    triggerInputDecimal (item, val) {
      const bit = item.bit || 4
      this.formData[item.key] = String(val)
        .replace(/[^\d.-]|^\./g, '')
        .replace(/\.{2}/g, '.')
        .replace(/(-.*)-/, '$1')
        .replace(/^0+$/, '0')
        .replace(/^0(\d{1})/g, '$1')
        // .replace(/^([1-9]\d*|0)(\.\d{1,4})(\.|\d{1})?$/, '$1$2')
        .replace(
          new RegExp(
            '^(\\-?[1-9]\\d*|\\-?0)(\\.\\d{1,' + bit + '})(.|\\d{1})?$'
          ),
          '$1$2'
        )
    },
    startDateOptions (date, key) {
      if (this.formData[key].end !== null) {
        return date.getTime() > new Date(this.formData[key].end).getTime()
      } else {
        return false
      }
    },
    endDateOptions (date, key) {
      if (this.formData[key].start !== null) {
        return date.getTime() < new Date(this.formData[key].start).getTime()
      } else {
        return false
      }
    },

    datePickerChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    radioChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    checkboxChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    handleChange (item, file, fileList) {
      this.formData[item.key] = fileList
    },
    handleSuccess (item, file, fileList) {
      this.formData[item.key] = fileList.map((unit) => {
        return {
          ...unit,
          url: unit.response
            ? unit.response && api + unit.response.data[0]
            : unit.url,
          urlTip: unit.response
            ? unit.response && unit.response.data[0]
            : unit.url
        }
      })
    },
    handleError (item, file, fileList) {
      console.log('error!!!')
    },
    beforeUpload (file) {
      const limitTenM = file.size / 1024 / 1024 < 10
      if (!limitTenM) {
        this.$message.error('请上传10M以下的文件')
        return false
      }
    },
    handleRemove (item, file, fileList) {
      this.formData[item.key] = fileList
    },
    handlePrevie (item, file) {
      if (item.listType === 'picture-card') {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
        return
      }
      item.preview && item.preview(file)
    },
    ok () {
      this.$refs.formRef.validate((boolean, object) => {
        if (boolean) {
          this.$emit('ok', this.formData)
        }
      })
    },
    // 组装tree数据
    computedTreeData ({ key, data }) {
      const tree = this.$refs[key][0]
      if (tree.getCheckedKeys().length === 0) {
        return {}
      }
      return {
        getCheckedNodes: tree.getCheckedNodes(),
        getCheckedKeys: tree.getCheckedKeys(),
        getHalfCheckedNodes: tree.getHalfCheckedNodes(),
        getHalfCheckedKeys: tree.getHalfCheckedKeys(),
        getCurrentKey: tree.getCurrentKey(),
        getCurrentNode: tree.getCurrentNode(),
        getNode: tree.getNode()
      }
    },
    inputChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    selectChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    switchChange (item, val) {
      item.method && item.method(this.formData, val)
    },
    // autocomplete的远程方法
    remoteMethod (item, query) {
      if (query !== '') {
        item.method && item.method(this.formData, query)
      }
    },
    reset () {
      this.$refs.formRef.resetFields()
      console.log('来了来了', this.formData)
      this.$emit('reset')
    },
    // 父组件通过ref调用此方法-获取form数据
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.formRef.validate((boolean) => {
          if (boolean) {
            // 给tree单元，设置checked属性
            for (const i in this.formData) {
              if (this.formData[i] && this.formData[i].type === 'tree') {
                this.formData[i].checked = this.computedTreeData({
                  key: i,
                  data: this.formData[i].data
                })
              }
            }
            resolve(this.formData)
          } else {
            reject(new Error('验证不通过'))
          }
        })
      })
    }
  },
  mounted () {},
  watch: {
    items () {}
  }
}
</script>

<style lang="css" scoped>
.hide {
  display: none;
}
.disabled .el-upload--picture-card {
  display: none;
}
.ml10 {
  margin-left: 10px;
}
</style>
