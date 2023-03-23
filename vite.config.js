import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    json2csv: "json2csv/dist/json2csv.umd.js",
  },
})
