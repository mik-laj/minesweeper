import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Board from '../minesweeper/board/Board'
import Timer from './../components/Timer'
import { IoMdFlag } from 'react-icons/io'
import { BiSmile, BiSad } from 'react-icons/bi'
import { Wrapper, Menu } from './Minesweeper.css'
import Modal from './../components/modal/Modal'
import { RootState } from './../reducers/index'

const Minesweeper = () => {
  const selectorParameters = useSelector((state: RootState) => state.gameParameters)

  const [width, setWidth] = useState(selectorParameters.width)
  const [height, setHeight] = useState(selectorParameters.height)
  const [mines, setMines] = useState(selectorParameters.mines)
  const [isLose, setIsLose] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [winTime, setWinTime] = useState(0)
  const [isRefresh, setIsRefresh] = useState(false)
  const [flags, setFlags] = useState(selectorParameters.mines)
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        setIsOpenModal(true)
      }, 500);
    }
  }, [isWin]);

  useEffect(() => {
    setWidth(selectorParameters.width)
    setHeight(selectorParameters.height)
    setMines(selectorParameters.mines)
    restart();
  }, [selectorParameters]);

  const restart = () => {
    setIsLose(false)
    setFlags(selectorParameters.mines)
    setIsRefresh(true)
    setIsWin(false)

    setTimeout(() => {
      setIsRefresh(false)
    }, 10);
  }

  return (
    <Wrapper>
      <Modal startOpen={isOpenModal} close={() => setIsOpenModal(false)}>
        win {winTime}
      </Modal>
      <Menu>
        <IoMdFlag />
        <span style={{ fontSize: 20, marginRight: 30 }}>
          {flags}
        </span>
        {
          isLose ?
            (<BiSad style={{ cursor: 'pointer' }} onClick={restart} />) :
            (<BiSmile style={{ cursor: 'pointer' }} onClick={restart} />)
        }
        <Timer
          isRefresh={isRefresh}
          isWin={isWin}
          setWinTime={setWinTime}
          isLose={isLose}
        />
      </Menu>
      {
        !isRefresh ?
          <Board
            width={width}
            height={height}
            mines={mines}
            setFlags={setFlags}
            setIsLose={setIsLose}
            isLose={isLose}
            setIsWin={setIsWin}
            isWin={isWin}
          /> : null
      }
    </Wrapper>
  )
}

export default Minesweeper;