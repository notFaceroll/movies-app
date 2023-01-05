import { LinearGradient } from "expo-linear-gradient";


export default function Gradient({ children }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['rgba(0,0,0,1)', '#351514', '#371716', 'rgba(0,0,0,1)']}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )
}