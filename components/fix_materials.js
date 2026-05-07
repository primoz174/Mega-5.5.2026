const fs = require('fs');

let code = fs.readFileSync('MethodIllustrations.tsx', 'utf8');

// 1. Add lights to Canvas
code = code.replace(/<fog attach="fog"/g, `<ambientLight intensity={0.7} />\n        <directionalLight position={[10, 10, 5]} intensity={1.5} />\n        <pointLight position={[-10, 5, -10]} intensity={0.8} />\n        <fog attach="fog"`);

// Helper to replace meshBasicMaterial with meshStandardMaterial in a specific context
function makeSolid(blockCommentName, replacements) {
    let parts = code.split(blockCommentName);
    if (parts.length < 2) return;
    
    // Assume the target is in the second part (right after the comment)
    // We only replace the FIRST few occurrences within a limited range (e.g., next 10-20 lines)
    for (let r of replacements) {
        parts[1] = parts[1].replace(r.from, r.to);
    }
    code = parts.join(blockCommentName);
}

// VT: Camera head and Screen
makeSolid('{/* Camera head / probe */}', [
    { from: /<meshBasicMaterial[^>]*\/>/g, to: '<meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />' }
]);
makeSolid('{/* Handle / connector */}', [
    { from: /<meshBasicMaterial[^>]*\/>/g, to: '<meshStandardMaterial color="#475569" metalness={0.7} roughness={0.2} />' }
]);
makeSolid('{/* Inspection mirror/screen */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#334155" metalness={0.4} roughness={0.6} />' }
]);

// PT: Spray nozzle
makeSolid('{/* Spray nozzle above */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />' }
]);

// MT: Yoke
makeSolid('{/* Yoke handle */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.8} />' }
]);
makeSolid('{/* Left leg */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />' }
]);
makeSolid('{/* Right leg */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />' }
]);
makeSolid('{/* Left coil */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.6} />' } // Copper-like
]);
makeSolid('{/* Right coil */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.6} />' }
]);

// UT: Probes
makeSolid('{/* UT Probe 1 (Transmitting) */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.7} />' } // Dark plastic body
]);
makeSolid('{/* UT Probe 2 (Receiving - Optional) */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.7} />' }
]);

// UTT: Scanner
makeSolid('{/* Scanner head */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#334155" metalness={0.3} roughness={0.6} />' }
]);
makeSolid('{/* Scanner body */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />' } // Darker body
]);

// RT: Emitter
// RT Emitter housing is first mesh inside "{/* Emitter Housing */}"
makeSolid('{/* Emitter Housing */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />' }
]);
makeSolid('{/* X-ray tube / collimator */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />' }
]);

// RTEval: Loupe & Light box base
makeSolid('{/* Light box base */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.5} />' }
]);
makeSolid('{/* Viewing Loupe */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />' } // Replace loupe housing
]);

// UCI: Probe housing & body
makeSolid('{/* Probe housing */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />' }
]);
makeSolid('{/* Probe body */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />' }
]);

// Leeb: Tube & trigger
makeSolid('{/* Guide tube */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />' } // Polished metal tube
]);
makeSolid('{/* Trigger mechanism */}', [
    { from: /<meshBasicMaterial[^>]*\/>/, to: '<meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.7} />' }
]);

fs.writeFileSync('MethodIllustrations.tsx', code);
console.log('Update complete');
