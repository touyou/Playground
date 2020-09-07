buildscript {
    val kotlinVersion = "1.4.0"
    val sqlDelightVersion: String by project
    val gradleVersion = "4.1.0-rc02"

    repositories {
        gradlePluginPortal()
        jcenter()
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:$gradleVersion")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
        classpath("org.jetbrains.kotlin:kotlin-serialization:$kotlinVersion")
        classpath("com.squareup.sqldelight:gradle-plugin:$sqlDelightVersion")
    }
}
group = "dev.touyou.kmmhandsonsample"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}
