import { useState, useEffect, useRef } from 'react'

const App = () => {
  const initialValue = 300
  const subCount = 60

  // 카운팅 되는 타겟이자 화면에 표시할 숫자
  const [timer, setTimer] = useState(initialValue)

  // 최초로 인터벌이 시작되었는지 감지하는 상태 => 인증번호 재전송 버튼 & 시계 표시 여부
  const [didInterval, setDidInterval] = useState(false)

  // 현재 인터벌이 작동하고 있는지 상태
  const [isActive, setIsActive] = useState(false)

  // interval hook
  const useInterval = (callback, delay) => {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const tick = () => savedCallback.current()

      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  // hook 실행
  useInterval(() => {
    setTimer(prev => prev - 1)
  }, isActive ? 1000 : null)

  // 인증번호 버튼 
  const sendHandler = () => {
    // 최초 인터벌 동작 상태 변경 & 이미 동작시 리턴
    if (!didInterval) setDidInterval(true)
    else return

    // 인터벌 동작 상태로 변경
    setIsActive(true)

    // TODO: 인증번호 전송하는 로직
  }

  // 인증번호 재전송 버튼 
  const reSendHandler = () => {
    // 1분 미만 경과시 리턴
    if (timer > initialValue - subCount) return alert("1분 후에 시도해주세요")

    // 작동중인 인터벌 중지 => 타이머 초기화 => 인터벌 다시 시작
    setIsActive(false)
    setTimer(initialValue)
    setIsActive(true)

    // TODO: 인증번호 재전송 하는 로직 
  }

  // 잔여 카운트가 0이 되면 인터벌 종료
  useEffect(() => {
    if (timer === 0) setIsActive(false)
  }, [timer])

  return (
    <>
      <div
        style={{
          width: 175,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          marginBottom: 20
        }}
        onClick={sendHandler}
      >
        인증번호
      </div>

      {didInterval && <p>{Math.floor(timer / 60)} : {(timer % 60) < 10 ? `0${timer % 60}` : timer % 60}</p>}

      <input
        style={{
          border: 'none',
          borderBottom: '1px solid black',
          outline: 'none'
        }}
      />

      {
        didInterval &&
        <div
          style={{
            width: 175,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            marginTop: 20
          }}
          onClick={reSendHandler}
        >
          인증번호 재전송
        </div>
      }
    </>
  )
}

export default App