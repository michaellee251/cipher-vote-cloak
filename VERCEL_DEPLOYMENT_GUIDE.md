# Vercel部署详细指南 - Cipher Vote Cloak

## 项目信息
- **GitHub仓库**: https://github.com/michaellee251/cipher-vote-cloak
- **项目类型**: React + Vite + TypeScript
- **钱包集成**: RainbowKit + Wagmi
- **UI框架**: shadcn/ui + Tailwind CSS

## 第一步：访问Vercel并登录

1. 打开浏览器，访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub" 使用GitHub账号登录
4. 授权Vercel访问您的GitHub仓库

## 第二步：创建新项目

1. 登录后，点击 "New Project" 按钮
2. 在 "Import Git Repository" 页面，搜索 `cipher-vote-cloak`
3. 找到 `michaellee251/cipher-vote-cloak` 仓库
4. 点击 "Import" 按钮

## 第三步：项目配置

### 基本配置
- **Project Name**: `cipher-vote-cloak` (或自定义名称)
- **Framework Preset**: `Vite`
- **Root Directory**: `./` (默认)
- **Build Command**: `npm run build` (自动检测)
- **Output Directory**: `dist` (自动检测)
- **Install Command**: `npm install` (自动检测)

### 环境变量配置 (重要!)

点击 "Environment Variables" 部分，添加以下变量：

#### 必需的环境变量：
```
VITE_WALLETCONNECT_PROJECT_ID = 2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_CONTRACT_ADDRESS = 0x0000000000000000000000000000000000000000
VITE_CHAIN_ID = 11155111
VITE_IPFS_GATEWAY = https://ipfs.io/ipfs/
VITE_FHE_NETWORK_URL = https://api.zama.ai
```

#### 环境变量详细说明：

1. **VITE_WALLETCONNECT_PROJECT_ID**
   - 值: `2ec9743d0d0cd7fb94dee1a7e6d33475`
   - 说明: WalletConnect项目ID，用于钱包连接
   - 环境: Production, Preview, Development

2. **VITE_CONTRACT_ADDRESS**
   - 值: `0x0000000000000000000000000000000000000000` (占位符)
   - 说明: 部署的智能合约地址
   - 环境: Production, Preview, Development
   - 注意: 部署合约后需要更新此值

3. **VITE_CHAIN_ID**
   - 值: `11155111`
   - 说明: Sepolia测试网链ID
   - 环境: Production, Preview, Development

4. **VITE_IPFS_GATEWAY**
   - 值: `https://ipfs.io/ipfs/`
   - 说明: IPFS网关地址，用于存储加密内容
   - 环境: Production, Preview, Development

5. **VITE_FHE_NETWORK_URL**
   - 值: `https://api.zama.ai`
   - 说明: FHE网络API地址
   - 环境: Production, Preview, Development

## 第四步：高级配置

### 构建配置
在 "Build & Development Settings" 中：

- **Node.js Version**: `18.x` (推荐)
- **Build Command**: `npm run build`
- **Development Command**: `npm run dev`
- **Install Command**: `npm install`

### 重写规则 (已在vercel.json中配置)
项目已包含vercel.json文件，包含以下配置：
- SPA路由重写规则
- 静态资源缓存头
- 构建输出目录

## 第五步：部署

1. 确认所有配置正确后，点击 "Deploy" 按钮
2. Vercel将开始构建项目
3. 构建过程大约需要2-5分钟
4. 构建完成后，您将获得一个部署URL

## 第六步：部署后配置

### 1. 获取部署URL
部署成功后，Vercel会提供：
- **Production URL**: `https://cipher-vote-cloak.vercel.app` (示例)
- **Preview URL**: 每次推送都会生成新的预览URL

### 2. 更新合约地址 (部署合约后)
当您部署智能合约后：
1. 进入Vercel项目设置
2. 找到 "Environment Variables"
3. 更新 `VITE_CONTRACT_ADDRESS` 为实际合约地址
4. 重新部署项目

### 3. 自定义域名 (可选)
1. 在项目设置中找到 "Domains"
2. 添加您的自定义域名
3. 配置DNS记录指向Vercel

## 第七步：验证部署

### 功能测试清单：
- [ ] 页面正常加载
- [ ] 钱包连接功能正常
- [ ] 导航菜单工作正常
- [ ] Create Session页面可访问
- [ ] Results页面可访问
- [ ] 响应式设计正常
- [ ] 控制台无错误

### 常见问题排查：

1. **构建失败**
   - 检查Node.js版本是否为18.x
   - 确认所有依赖都在package.json中
   - 查看构建日志中的错误信息

2. **钱包连接失败**
   - 确认WalletConnect Project ID正确
   - 检查网络配置
   - 确认合约地址正确

3. **页面404错误**
   - 确认vercel.json配置正确
   - 检查路由配置
   - 确认SPA重写规则生效

## 第八步：持续部署

### 自动部署
- 推送到main分支会自动触发生产部署
- 推送到其他分支会创建预览部署
- 每次部署都会生成新的URL

### 手动部署
1. 在Vercel仪表板中点击 "Deployments"
2. 选择要重新部署的版本
3. 点击 "Redeploy"

## 监控和维护

### 性能监控
- Vercel提供内置的性能分析
- 可以集成Google Analytics等工具
- 监控Core Web Vitals指标

### 日志查看
1. 进入项目仪表板
2. 点击 "Functions" 标签
3. 查看实时日志和错误信息

## 安全注意事项

1. **环境变量安全**
   - 不要在代码中硬编码敏感信息
   - 使用Vercel的环境变量功能
   - 定期轮换API密钥

2. **合约安全**
   - 确保合约地址正确
   - 验证合约功能正常
   - 定期更新合约

3. **访问控制**
   - 配置适当的CORS策略
   - 限制API访问频率
   - 监控异常访问

## 成本估算

### Vercel免费计划限制：
- 100GB带宽/月
- 1000个函数调用/月
- 无限静态部署
- 自定义域名支持

### 升级建议：
如果项目流量较大，考虑升级到Pro计划：
- 1TB带宽/月
- 1000万函数调用/月
- 优先支持
- 高级分析功能

## 联系支持

如果遇到问题：
1. 查看Vercel文档：https://vercel.com/docs
2. 访问Vercel社区：https://github.com/vercel/vercel/discussions
3. 联系Vercel支持：https://vercel.com/support

---

**部署完成后，您的FHE投票平台将在Vercel上运行，支持钱包连接、投票会话创建和结果查看功能。**
