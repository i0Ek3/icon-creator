import React, { useState, useRef, useEffect } from 'react';
import { Download, Square, Circle, Sparkles, RefreshCw, Package, Globe, Github } from 'lucide-react';

export default function IconCreator() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [lang, setLang] = useState('zh');
  const [bgImage, setBgImage] = useState(null);
  const [config, setConfig] = useState({
    size: 128,
    bgType: 'gradient',
    bgColor1: '#667eea',
    bgColor2: '#764ba2',
    shape: 'rounded',
    iconType: 'text',
    text: 'A',
    textColor: '#ffffff',
    fontSize: 70,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: 'bold',
    fontStyle: 'normal',
    subtitle: '',
    subtitleColor: '#ffffff',
    subtitleSize: 20,
    subtitleFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    subtitleFontWeight: 'normal',
    subtitleFontStyle: 'normal',
    shadowBlur: 5,
    shadowColor: 'rgba(0,0,0,0.3)',
    fileName: 'icon',
  });

  const translations = {
    zh: {
      title: 'Icon Creator',
      subtitle: '为你的应用创建精美的图标',
      preview: '预览',
      downloadPNG: '下载 PNG',
      downloadJPG: '下载 JPG',
      downloadICO: '下载 ICO',
      downloadICNS: '下载 ICNS',
      downloadPack: '下载图标包',
      packSizes: '(16, 48, 128px)',
      content: '图标内容',
      textSymbol: '文字/符号',
      textSize: '文字大小',
      textColor: '文字颜色',
      fontFamily: '字体',
      fontWeight: '字体粗细',
      fontStyle: '字体样式',
      subtitle: '副标题',
      subtitleSize: '副标题大小',
      subtitleColor: '副标题颜色',
      subtitleFontFamily: '副标题字体',
      subtitleFontWeight: '副标题字体粗细',
      subtitleFontStyle: '副标题字体样式',
      fileName: '文件名',
      background: '背景',
      randomColors: '随机配色',
      bgType: '类型',
      gradient: '渐变',
      solid: '纯色',
      image: '图片',
      color1: '颜色 1',
      color2: '颜色 2',
      presetColors: '预设配色',
      uploadImage: '上传图片',
      shape: '形状',
      rounded: '圆角',
      circle: '圆形',
      square: '方形',
      transparent: '透明',
      size: '尺寸',
    },
    en: {
      title: 'Icon Creator',
      subtitle: 'Create beautiful icons for your apps',
      preview: 'Preview',
      downloadPNG: 'Download PNG',
      downloadJPG: 'Download JPG',
      downloadICO: 'Download ICO',
      downloadICNS: 'Download ICNS',
      downloadPack: 'Download Pack',
      packSizes: '(16, 48, 128px)',
      content: 'Icon Content',
      textSymbol: 'Text/Symbol',
      textSize: 'Text Size',
      textColor: 'Text Color',
      fontFamily: 'Font Family',
      fontWeight: 'Font Weight',
      fontStyle: 'Font Style',
      subtitle: 'Subtitle',
      subtitleSize: 'Subtitle Size',
      subtitleColor: 'Subtitle Color',
      subtitleFontFamily: 'Subtitle Font Family',
      subtitleFontWeight: 'Subtitle Font Weight',
      subtitleFontStyle: 'Subtitle Font Style',
      fileName: 'File Name',
      background: 'Background',
      randomColors: 'Random Colors',
      bgType: 'Type',
      gradient: 'Gradient',
      solid: 'Solid',
      image: 'Image',
      color1: 'Color 1',
      color2: 'Color 2',
      presetColors: 'Preset Colors',
      uploadImage: 'Upload Image',
      shape: 'Shape',
      rounded: 'Rounded',
      circle: 'Circle',
      square: 'Square',
      transparent: 'Transparent',
      size: 'Size',
    }
  };

  const t = translations[lang];

  const gradients = [
    { name: 'Purple Dream', colors: ['#667eea', '#764ba2'] },
    { name: 'Sunset', colors: ['#ff6b6b', '#feca57'] },
    { name: 'Ocean', colors: ['#4facfe', '#00f2fe'] },
    { name: 'Forest', colors: ['#11998e', '#38ef7d'] },
    { name: 'Rose', colors: ['#f857a6', '#ff5858'] },
    { name: 'Night', colors: ['#2c3e50', '#4ca1af'] },
  ];

  useEffect(() => {
    if (!window.JSZip) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    drawIcon();
  }, [config, bgImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setBgImage(img);
          setConfig({ ...config, bgType: 'image' });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawIcon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = config.size;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas first
    ctx.clearRect(0, 0, size, size);

    // Only draw background if not transparent
    if (config.shape !== 'transparent') {
      // Save context for clipping
      ctx.save();

      // Create clipping path for shape
      if (config.shape === 'rounded') {
        const radius = size * 0.2;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(size - radius, 0);
        ctx.quadraticCurveTo(size, 0, size, radius);
        ctx.lineTo(size, size - radius);
        ctx.quadraticCurveTo(size, size, size - radius, size);
        ctx.lineTo(radius, size);
        ctx.quadraticCurveTo(0, size, 0, size - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
      } else if (config.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.rect(0, 0, size, size);
        ctx.closePath();
      }

      ctx.clip();

      // Draw background
      if (config.bgType === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, config.bgColor1);
        gradient.addColorStop(1, config.bgColor2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      } else if (config.bgType === 'image' && bgImage) {
        const scale = Math.max(size / bgImage.width, size / bgImage.height);
        const x = (size - bgImage.width * scale) / 2;
        const y = (size - bgImage.height * scale) / 2;
        ctx.drawImage(bgImage, x, y, bgImage.width * scale, bgImage.height * scale);
      } else {
        ctx.fillStyle = config.bgColor1;
        ctx.fillRect(0, 0, size, size);
      }

      ctx.restore();
    }

    // Draw text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = config.textColor;
    ctx.font = `${config.fontStyle} ${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;

    ctx.shadowBlur = config.shadowBlur;
    ctx.shadowColor = config.shadowColor;

    // Calculate text positions
    let mainTextY = size / 2;
    if (config.subtitle) {
      mainTextY = size / 2 - config.fontSize / 4;
    }

    ctx.fillText(config.text, size / 2, mainTextY);

    // Draw subtitle if exists
    if (config.subtitle) {
      ctx.font = `${config.subtitleFontStyle} ${config.subtitleFontWeight} ${config.subtitleSize}px ${config.subtitleFontFamily}`;
      ctx.fillStyle = config.subtitleColor;
      ctx.fillText(config.subtitle, size / 2, mainTextY + config.fontSize / 2 + config.subtitleSize / 2);
    }
  };

  const downloadIcon = (format = 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const sanitizedName = config.fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
      link.download = `${sanitizedName}.${format}`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, `image/${format}`);
  };

  const generateICO = async (blobs) => {
    const header = new ArrayBuffer(6);
    const view = new DataView(header);
    view.setUint16(0, 0, true); // Reserved
    view.setUint16(2, 1, true); // Type: 1 = ICO
    view.setUint16(4, blobs.length, true); // Number of images

    let offset = 6 + (blobs.length * 16);
    const entries = [];
    const data = [];

    for (const blob of blobs) {
      const buffer = await blob.arrayBuffer();
      const img = await createImageBitmap(blob);
      const width = img.width >= 256 ? 0 : img.width;
      const height = img.height >= 256 ? 0 : img.height;

      const entry = new ArrayBuffer(16);
      const entryView = new DataView(entry);
      entryView.setUint8(0, width);
      entryView.setUint8(1, height);
      entryView.setUint8(2, 0); // Colors
      entryView.setUint8(3, 0); // Reserved
      entryView.setUint16(4, 1, true); // Planes
      entryView.setUint16(6, 32, true); // Bits per pixel
      entryView.setUint32(8, buffer.byteLength, true); // Size
      entryView.setUint32(12, offset, true); // Offset

      entries.push(new Uint8Array(entry));
      data.push(new Uint8Array(buffer));
      offset += buffer.byteLength;
    }

    const combined = new Uint8Array(offset);
    combined.set(new Uint8Array(header), 0);
    let currentPos = 6;
    for (const entry of entries) {
      combined.set(entry, currentPos);
      currentPos += 16;
    }
    for (const d of data) {
      combined.set(d, currentPos);
      currentPos += d.length;
    }

    return new Blob([combined], { type: 'image/x-icon' });
  };

  const generateICNS = async (blobs) => {
    const types = {
      16: 'icp4',
      32: 'icp5',
      64: 'icp6',
      128: 'ic07',
      256: 'ic08',
      512: 'ic09',
      1024: 'ic10'
    };

    let totalLength = 8;
    const blocks = [];

    for (const blob of blobs) {
      const img = await createImageBitmap(blob);
      const type = types[img.width];
      if (!type) continue;

      const buffer = await blob.arrayBuffer();
      const length = 8 + buffer.byteLength;

      const blockHeader = new ArrayBuffer(8);
      const headerView = new DataView(blockHeader);
      for (let i = 0; i < 4; i++) {
        headerView.setUint8(i, type.charCodeAt(i));
      }
      headerView.setUint32(4, length, false); // Big-endian

      blocks.push(new Uint8Array(blockHeader));
      blocks.push(new Uint8Array(buffer));
      totalLength += length;
    }

    const combined = new Uint8Array(totalLength);
    // Header
    const mainHeader = new DataView(combined.buffer);
    mainHeader.setUint8(0, 'i'.charCodeAt(0));
    mainHeader.setUint8(1, 'c'.charCodeAt(0));
    mainHeader.setUint8(2, 'n'.charCodeAt(0));
    mainHeader.setUint8(3, 's'.charCodeAt(0));
    mainHeader.setUint32(4, totalLength, false);

    let currentPos = 8;
    for (const block of blocks) {
      combined.set(block, currentPos);
      currentPos += block.length;
    }

    return new Blob([combined], { type: 'image/x-icns' });
  };

  const downloadICO = async () => {
    const sizes = [16, 32, 48, 64, 128, 256];
    const blobs = await Promise.all(sizes.map(size => generateIconAtSize(size)));
    const icoBlob = await generateICO(blobs);
    const url = URL.createObjectURL(icoBlob);
    const link = document.createElement('a');
    const sanitizedName = config.fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
    link.download = `${sanitizedName}.ico`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadICNS = async () => {
    const sizes = [16, 32, 64, 128, 256, 512, 1024];
    const blobs = await Promise.all(sizes.map(size => generateIconAtSize(size)));
    const icnsBlob = await generateICNS(blobs);
    const url = URL.createObjectURL(icnsBlob);
    const link = document.createElement('a');
    const sanitizedName = config.fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
    link.download = `${sanitizedName}.icns`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateIconAtSize = (size) => {
    return new Promise((resolve) => {
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');

      tempCanvas.width = size;
      tempCanvas.height = size;

      ctx.clearRect(0, 0, size, size);

      if (config.shape !== 'transparent') {
        ctx.save();

        if (config.shape === 'rounded') {
          const radius = size * 0.2;
          ctx.beginPath();
          ctx.moveTo(radius, 0);
          ctx.lineTo(size - radius, 0);
          ctx.quadraticCurveTo(size, 0, size, radius);
          ctx.lineTo(size, size - radius);
          ctx.quadraticCurveTo(size, size, size - radius, size);
          ctx.lineTo(radius, size);
          ctx.quadraticCurveTo(0, size, 0, size - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
          ctx.closePath();
        } else if (config.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
        } else {
          ctx.beginPath();
          ctx.rect(0, 0, size, size);
          ctx.closePath();
        }

        ctx.clip();

        if (config.bgType === 'gradient') {
          const gradient = ctx.createLinearGradient(0, 0, size, size);
          gradient.addColorStop(0, config.bgColor1);
          gradient.addColorStop(1, config.bgColor2);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, size, size);
        } else if (config.bgType === 'image' && bgImage) {
          const scale = Math.max(size / bgImage.width, size / bgImage.height);
          const x = (size - bgImage.width * scale) / 2;
          const y = (size - bgImage.height * scale) / 2;
          ctx.drawImage(bgImage, x, y, bgImage.width * scale, bgImage.height * scale);
        } else {
          ctx.fillStyle = config.bgColor1;
          ctx.fillRect(0, 0, size, size);
        }

        ctx.restore();
      }

      const fontSize = (size / config.size) * config.fontSize;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = config.textColor;
      ctx.font = `${config.fontStyle} ${config.fontWeight} ${fontSize}px ${config.fontFamily}`;

      const shadowBlur = (size / config.size) * config.shadowBlur;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowColor = config.shadowColor;

      // Calculate text positions
      let mainTextY = size / 2;
      if (config.subtitle) {
        mainTextY = size / 2 - fontSize / 4;
      }

      ctx.fillText(config.text, size / 2, mainTextY);

      // Draw subtitle if exists
      if (config.subtitle) {
        const subtitleSize = (size / config.size) * config.subtitleSize;
        ctx.font = `${config.subtitleFontStyle} ${config.subtitleFontWeight} ${subtitleSize}px ${config.subtitleFontFamily}`;
        ctx.fillStyle = config.subtitleColor;
        ctx.fillText(config.subtitle, size / 2, mainTextY + fontSize / 2 + subtitleSize / 2);
      }

      tempCanvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  };

  const downloadIconPack = async () => {
    const sizes = [16, 48, 128];
    const JSZip = window.JSZip;

    if (!JSZip) {
      alert('Loading compression library, please try again...');
      return;
    }

    const zip = new JSZip();
    const sanitizedName = config.fileName.replace(/[^a-zA-Z0-9-_]/g, '_');

    for (const size of sizes) {
      const blob = await generateIconAtSize(size);
      zip.file(`${sanitizedName}${size}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.download = `${sanitizedName}-icons-pack.zip`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const randomizeColors = () => {
    const preset = gradients[Math.floor(Math.random() * gradients.length)];
    setConfig(prev => ({
      ...prev,
      bgColor1: preset.colors[0],
      bgColor2: preset.colors[1],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-gray-800">
              <Sparkles className="text-purple-600" />
              {t.title}
            </h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/i0Ek3/icon-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition text-gray-700 font-medium"
            >
              <Github size={20} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition text-gray-700"
            >
              <Globe size={20} />
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.preview}</h2>
            <div className="flex justify-center items-center bg-gray-50 rounded-xl p-8 border border-gray-100">
              <canvas
                ref={canvasRef}
                className="max-w-full shadow-xl rounded-lg"
                style={{ width: '400px', height: '400px' }}
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                onClick={() => downloadIcon('png')}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-medium transition text-white shadow-md"
              >
                <Download size={18} />
                <span className="hidden sm:inline">{t.downloadPNG}</span>
                <span className="sm:hidden">PNG</span>
              </button>
              <button
                onClick={() => downloadIcon('jpeg')}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition text-white shadow-md"
              >
                <Download size={18} />
                <span className="hidden sm:inline">{t.downloadJPG}</span>
                <span className="sm:hidden">JPG</span>
              </button>
              <button
                onClick={downloadICO}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition text-white shadow-md"
              >
                <Download size={18} />
                <span className="hidden sm:inline">{t.downloadICO}</span>
                <span className="sm:hidden">ICO</span>
              </button>
              <button
                onClick={downloadICNS}
                className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-3 rounded-lg font-medium transition text-white shadow-md"
              >
                <Download size={18} />
                <span className="hidden sm:inline">{t.downloadICNS}</span>
                <span className="sm:hidden">ICNS</span>
              </button>
              <button
                onClick={downloadIconPack}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-lg font-medium transition text-white shadow-md col-span-3 lg:col-span-1"
                title={t.packSizes}
              >
                <Package size={18} />
                <span className="hidden sm:inline">{t.downloadPack}</span>
                <span className="sm:hidden">Pack</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Text */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{t.content}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.textSymbol}</label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => setConfig({ ...config, text: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-2xl text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.textSize}: {config.fontSize}px</label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={config.fontSize}
                    onChange={(e) => setConfig({ ...config, fontSize: parseInt(e.target.value) })}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.textColor}</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                      className="w-16 h-12 rounded cursor-pointer border border-gray-200"
                    />
                    <input
                      type="text"
                      value={config.textColor}
                      onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.fontFamily}</label>
                  <select
                    value={config.fontFamily}
                    onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">System Default</option>
                    <option value="'IBM Plex Sans', sans-serif">IBM Plex Sans</option>
                    <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
                    <option value="'IBM Plex Serif', serif">IBM Plex Serif</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica Neue</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                    <option value="Impact, fantasy">Impact</option>
                    <option value="'Lucida Console', Monaco, monospace">Lucida Console</option>
                    <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">Palatino</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">{t.fontWeight}</label>
                    <select
                      value={config.fontWeight}
                      onChange={(e) => setConfig({ ...config, fontWeight: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="lighter">Light</option>
                      <option value="bolder">Bolder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">{t.fontStyle}</label>
                    <select
                      value={config.fontStyle}
                      onChange={(e) => setConfig({ ...config, fontStyle: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                      <option value="oblique">Oblique</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.subtitle}</label>
                  <input
                    type="text"
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    placeholder={lang === 'zh' ? '输入副标题文字' : 'Enter subtitle text'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {config.subtitle && (
                  <>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">{t.subtitleSize}: {config.subtitleSize}px</label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={config.subtitleSize}
                        onChange={(e) => setConfig({ ...config, subtitleSize: parseInt(e.target.value) })}
                        className="w-full accent-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-700">{t.subtitleColor}</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.subtitleColor}
                          onChange={(e) => setConfig({ ...config, subtitleColor: e.target.value })}
                          className="w-16 h-12 rounded cursor-pointer border border-gray-200"
                        />
                        <input
                          type="text"
                          value={config.subtitleColor}
                          onChange={(e) => setConfig({ ...config, subtitleColor: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-700">{t.subtitleFontFamily}</label>
                      <select
                        value={config.subtitleFontFamily}
                        onChange={(e) => setConfig({ ...config, subtitleFontFamily: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">System Default</option>
                        <option value="'IBM Plex Sans', sans-serif">IBM Plex Sans</option>
                        <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
                        <option value="'IBM Plex Serif', serif">IBM Plex Serif</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica Neue</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                        <option value="Impact, fantasy">Impact</option>
                        <option value="'Lucida Console', Monaco, monospace">Lucida Console</option>
                        <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">Palatino</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">{t.subtitleFontWeight}</label>
                        <select
                          value={config.subtitleFontWeight}
                          onChange={(e) => setConfig({ ...config, subtitleFontWeight: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Bold</option>
                          <option value="lighter">Light</option>
                          <option value="bolder">Bolder</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2 text-gray-700">{t.subtitleFontStyle}</label>
                        <select
                          value={config.subtitleFontStyle}
                          onChange={(e) => setConfig({ ...config, subtitleFontStyle: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="italic">Italic</option>
                          <option value="oblique">Oblique</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.fileName}</label>
                  <input
                    type="text"
                    value={config.fileName}
                    onChange={(e) => setConfig({ ...config, fileName: e.target.value })}
                    placeholder={lang === 'zh' ? '输入文件名' : 'Enter file name'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t.background}</h3>
                <button
                  onClick={randomizeColors}
                  className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition text-gray-700"
                >
                  <RefreshCw size={16} />
                  {t.randomColors}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">{t.bgType}</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setConfig({ ...config, bgType: 'gradient' })}
                      className={`px-4 py-2 rounded-lg transition ${config.bgType === 'gradient' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                      {t.gradient}
                    </button>
                    <button
                      onClick={() => setConfig({ ...config, bgType: 'solid' })}
                      className={`px-4 py-2 rounded-lg transition ${config.bgType === 'solid' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                      {t.solid}
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2 rounded-lg transition ${config.bgType === 'image' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                      {t.image}
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {config.bgType !== 'image' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">{t.color1}</label>
                        <input
                          type="color"
                          value={config.bgColor1}
                          onChange={(e) => setConfig({ ...config, bgColor1: e.target.value })}
                          className="w-full h-12 rounded cursor-pointer border border-gray-200"
                        />
                      </div>
                      {config.bgType === 'gradient' && (
                        <div>
                          <label className="block text-sm mb-2 text-gray-700">{t.color2}</label>
                          <input
                            type="color"
                            value={config.bgColor2}
                            onChange={(e) => setConfig({ ...config, bgColor2: e.target.value })}
                            className="w-full h-12 rounded cursor-pointer border border-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-2 mb-3 text-gray-700">{t.presetColors}</label>
                      <div className="grid grid-cols-3 gap-2">
                        {gradients.map((preset, idx) => (
                          <button
                            key={idx}
                            onClick={() => setConfig({
                              ...config,
                              bgColor1: preset.colors[0],
                              bgColor2: preset.colors[1],
                            })}
                            className="h-12 rounded-lg transition hover:scale-105 border-2 border-gray-200 hover:border-purple-400"
                            style={{
                              background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                            }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Shape */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{t.shape}</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'rounded', label: t.rounded, icon: Square },
                  { value: 'circle', label: t.circle, icon: Circle },
                  { value: 'square', label: t.square, icon: Square },
                  { value: 'transparent', label: t.transparent, icon: Sparkles },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setConfig({ ...config, shape: value })}
                    className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition ${config.shape === value ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                  >
                    <Icon size={24} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{t.size}</h3>
              <div className="grid grid-cols-4 gap-2">
                {[16, 32, 64, 128, 256, 512, 1024].map(size => (
                  <button
                    key={size}
                    onClick={() => setConfig({ ...config, size })}
                    className={`px-4 py-2 rounded-lg transition ${config.size === size ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-500">
                {lang === 'zh' ? 'macOS 标准尺寸：16px (菜单栏), 32px (Dock), 128px (应用图标), 256px (Launchpad), 512px (App Store), 1024px (高分辨率)' : 'macOS standard sizes: 16px (menu bar), 32px (Dock), 128px (app icon), 256px (Launchpad), 512px (App Store), 1024px (high resolution)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}