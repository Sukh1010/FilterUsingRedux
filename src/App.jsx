import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import { useSelector ,useDispatch} from 'react-redux'
import {addCount, subCount, addByValue} from "./Slices/CounterSlice"
import Layout from './components/Layout'
function App() {
  const [value,setValue] = useState(0)
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  const add =() => {
    dispatch(addCount())
  }
  const minus =() => {
    dispatch(subCount())
  }

  const handleAdd =()=>{
    dispatch(addByValue(value))
  }

  return (
    <>
    <Layout/>
    </>
  )
}

export default App
