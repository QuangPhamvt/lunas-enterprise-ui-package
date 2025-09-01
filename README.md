# UI LUNAS - Thư viện Component React

## ✨ Tính năng

- 🎨 **Thiết kế đẹp mắt**: Component được thiết kế theo các nguyên tắc UI/UX hiện đại
- 🔧 **Dễ tùy chỉnh**: Hỗ trợ CSS-in-JS, CSS modules, và Tailwind CSS
- 📱 **Responsive**: Tất cả component đều responsive và mobile-friendly
- ♿ **Accessible**: Tuân thủ các chuẩn WCAG 2.1 cho accessibility
<!--- 🌙 **Dark mode**: Hỗ trợ dark mode built-in-->
- 📦 **Tree-shaking**: Chỉ import những gì bạn cần
- 🔷 **TypeScript**: Được viết hoàn toàn bằng TypeScript với type definitions đầy đủ

## 📦 Cài đặt

```bash
# npm
npm i @customafk/lunas-ui

# yarn
yarn add @customafk/lunas-ui

# pnpm
pnpm add @customafk/lunas-ui
```

### Peer Dependencies

```bash
npm install react react-dom
```

## 🚀 Sử dụng nhanh

```jsx
import React from 'react'
import { Button, Card, Input } from 'your-ui-library'
import 'your-ui-library/dist/styles.css'

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Click me!</Button>
    </Card>
  )
}

export default App
```

## 📋 Danh sách Component

### Form Components

- `Button` - Các loại button với nhiều variant
- `Input` - Text input với validation
- `Select` - Dropdown select
- `Checkbox` - Checkbox và radio button
- `Switch` - Toggle switch

### Layout Components

- `Container` - Wrapper container
- `Grid` - Flexible grid system
- `Card` - Card component
- `Modal` - Modal dialog
- `Drawer` - Side drawer

### Feedback Components

- `Alert` - Alert messages
- `Toast` - Toast notifications
- `Loading` - Loading indicators
- `Progress` - Progress bars

### Navigation Components

- `Navbar` - Navigation bar
- `Breadcrumb` - Breadcrumb navigation
- `Pagination` - Pagination component
- `Tabs` - Tab component

## 📖 Documentation

Xem [documentation đầy đủ](https://ui.lunas.vn) để biết thêm chi tiết về:

- **Getting Started**: Hướng dẫn setup và configuration
- **Component API**: Props, methods và examples cho từng component
- **Theming**: Cách customize theme và colors
- **Examples**: Các ví dụ thực tế và use cases

## 🎨 Theming

## 🔧 Configuration

### CSS Import

```jsx
// Import tất cả styles
import 'your-ui-library/dist/styles.css'

// Hoặc import riêng từng component
import 'your-ui-library/dist/components/Button.css'
```

### Bundle Size Optimization

```jsx
// Tree-shaking - chỉ import những gì cần
import { Button } from 'your-ui-library'

// Thay vì import toàn bộ
import * as UI from 'your-ui-library' // ❌ Không nên
```

## 🌟 Examples

### Basic Form

### Dark Mode

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/QuangPhamvt/lunas-enterprise-ui-package.git
cd lunas-enterprise-ui-package

# Install dependencies
npm install

# Build library
npm run build

# Run storybook
npm run storybook
```

### Scripts

## 🤝 Contributing

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

### Development Process

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

### Coding Standards

- Code theo ESLint config
- Viết tests cho features mới
- Update documentation khi cần
- Follow conventional commits

## 📝 Changelog

Xem [CHANGELOG.md](CHANGELOG.md) để biết lịch sử thay đổi của từng version.

## 📄 License

MIT © [Your Name](https://github.com/yourusername)

## 🙋‍♀️ Support

- **Documentation**: [https://your-ui-library-docs.com](https://your-ui-library-docs.com)
- **GitHub Issues**: [Report bugs hoặc feature requests](https://github.com/yourusername/your-ui-library/issues)
- **Discord**: [Join community](https://discord.gg/your-discord)
- **Email**: support@your-ui-library.com

## 🏆 Credits

- Cảm ơn [React](https://reactjs.org/) team
- Icons từ [Heroicons](https://heroicons.com/)
- Inspiration từ [Chakra UI](https://chakra-ui.com/) và [Material-UI](https://mui.com/)

---

<div align="center">
  Được tạo với ❤️ bởi <a href="https://github.com/QuangPhamvt">CustomAFK</a>
</div>

<!--```json
{
  "./styles/base": "./styles/base.css",
  "./styles/loader": "./styles/loader.css",
  "./styles/theme": "./styles/theme.css",
  "./styles/typography": "./styles/typography.css",
}
```-->
