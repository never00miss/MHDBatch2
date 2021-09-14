import { Dimensions } from "react-native"

export const colors = {
    bgcolor: "#05668d",
    color2: '#028090',
    color3: '#00a896',
    secondary: '#02c39a',
    primary: '#f0f3bd',
    black: '#000000',
    yellow: '#F7E018',
    red: '#DC052D',
    blue: '#0066B2'
}

export const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color2,
}

export const { width, height } = Dimensions.get('window')