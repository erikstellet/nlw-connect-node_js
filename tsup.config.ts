import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['./src/**/*.ts'],
  format: 'esm',
  outDir: 'dist',
})
