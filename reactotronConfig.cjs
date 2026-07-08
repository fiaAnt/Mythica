import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

if (__DEV__) {
  Reactotron.configure({ name: 'React Native Demo' })
    .useReactNative()
    .use(reactotronRedux())
    .connect()
}

export default Reactotron
