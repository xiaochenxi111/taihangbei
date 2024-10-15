import React, { useRef, useEffect } from 'react';

const VerifyCode = ({ onUpdateCode }) => {
  const canvasRef = useRef(null);
  const code = useRef('');

  const generateCode = () => {
    const chars = '1234567890';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const drawCode = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.font = '20px Arial';

    // 绘制验证码字符
    for (let i = 0; i < code.current.length; i++) {
      ctx.fillStyle = getRandomColor();
      ctx.fillText(code.current[i], 10 + i * 20, 30);
    }

    // 绘制干扰线
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = getRandomColor();
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvasRef.current.width, Math.random() * canvasRef.current.height);
      ctx.lineTo(Math.random() * canvasRef.current.width, Math.random() * canvasRef.current.height);
      ctx.stroke();
    }
  };

  const refreshCode = () => {
    code.current = generateCode();
    drawCode();
    onUpdateCode(code.current);
  };

  useEffect(() => {
    canvasRef.current.width = 100;
    canvasRef.current.height = 40;
    refreshCode();
  }, []);

  return (
    <div className="verify-code" style={{ display: 'flex', alignItems: 'center' }}>
      <canvas ref={canvasRef} onClick={refreshCode} style={{ border: '1px solid #aaa', cursor: 'pointer', marginRight: '10px' }}></canvas>
      <p onClick={refreshCode} style={{ margin: 0, cursor: 'pointer' }}>换一张</p>
    </div>
  );
};

export default VerifyCode;
