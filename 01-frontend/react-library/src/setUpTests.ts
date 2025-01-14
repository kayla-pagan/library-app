import { vi } from "vitest"

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(),
        putInageData: vi.fn(),
        createImageData: vi.fn(),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        strokeRect: vi.fn(),
        strokeText: vi.fn(),
        t2s: vi.fn(),
    })
})