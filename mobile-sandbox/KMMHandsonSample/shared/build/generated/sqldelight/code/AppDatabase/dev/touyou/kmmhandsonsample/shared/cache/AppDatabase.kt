package dev.touyou.kmmhandsonsample.shared.cache

import com.squareup.sqldelight.Transacter
import com.squareup.sqldelight.db.SqlDriver
import dev.touyou.kmmhandsonsample.shared.cache.shared.newInstance
import dev.touyou.kmmhandsonsample.shared.cache.shared.schema

interface AppDatabase : Transacter {
  val appDatabaseQueries: AppDatabaseQueries

  companion object {
    val Schema: SqlDriver.Schema
      get() = AppDatabase::class.schema

    operator fun invoke(driver: SqlDriver): AppDatabase = AppDatabase::class.newInstance(driver)}
}
