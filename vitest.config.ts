import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({ 
    resolve: { 
        alias: { 
            "@": path.resolve(process.cwd(), ".") 
        } }, 
        test: { 
            exclude: ["node_modules/**", "tests/e2e/**", ".next/**"] 
        } });
