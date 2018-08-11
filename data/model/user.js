const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化UserSchema
const UserSchema = new Schema({
    name: String,
    code: String,
    password: String,

    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 在保存数据之前更新日期
UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updatedAt = Date.now();
    }

    next();
});

// 建立Info数据模型
mongoose.model('User', UserSchema);
