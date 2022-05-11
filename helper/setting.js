import db from '../models/api/v1/index.js'
import QueryTypes from '@sequelize/core'
const sequelize = db.sequelize

class SettingHelper {
  async getSettingValue (settingKey) {
    const data = await sequelize.query(
      'SELECT setting_value FROM settings WHERE setting_key = $setting_key',
      {
        bind: {
          setting_key: settingKey
        },
        type: QueryTypes.SELECT,
        plain: true
      }
    )
    return data
  }
}

export default new SettingHelper()
