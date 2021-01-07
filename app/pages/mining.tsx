import { observer, useLocalObservable } from "mobx-react-lite"
import { globalStyles } from "../../utils/styles"
import { useStore } from "stores/index"
import { useAuth } from "../../utils/react-hooks"
import { useEffect } from "react"
import dayjs from "dayjs"
import TextArea from "antd/lib/input/TextArea"

const Mining = observer(() => {
  useAuth()
  const { auth, grade } = useStore()
  const store = useLocalObservable(() => ({
    pointCouldGain: 0,
    timer: null,
    updateScore() {
      clearInterval(store.timer)
      store.timer = setInterval(() => {
        if (!auth.user?.gain_point_at) return
        const pointCouldGain = dayjs().diff(auth.user.gain_point_at, "seconds")
        store.pointCouldGain = Math.min(pointCouldGain, auth.user.grade_gradeTouser.max_point)
      }, 1000)
    },
    get nextLevel() {
      if (!auth.user) return null
      return grade.grades[auth.user.grade + 1]
    },
  }))
  useEffect(() => {
    store.updateScore()
    return () => {
      clearInterval(store.timer)
    }
  }, [])
  return (
    <div className={globalStyles.container}>
      <div>point couuld be gain: {store.pointCouldGain}</div>
      <div>max point: {auth.user?.point_renaming}</div>
      <div>current point: {auth.user?.point_renaming}</div>
      <div>next level needed point: {store.nextLevel?.point_begin}</div>
    </div>
  )
})

export default Mining
