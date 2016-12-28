## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/zhiyingzzhou/ReactNative-Project
  $ cd ReactNative-Project
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  $ (cd ios; pod install)        # only for iOS version
  ```
3. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  ```


4. **Running on iOS:**

  ```
  $ react-native run-ios
  ```
