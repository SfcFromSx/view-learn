const { Layout, Menu, Breadcrumb, Row, Col } = antd;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => (
    <Layout>
        <Header style={{padding:0}} className="header">
            <div style={{width: 200, height: '100%'}}/>
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" title="大屏设计">
                        <Menu.Item key="1">模板设计</Menu.Item>
                        <Menu.Item key="2">可视化编辑</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="业务设计">
                        <Menu.Item key="5">DAG设计</Menu.Item>
                        <Menu.Item key="6">模型配置</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title="系统配置">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 800,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    </Layout>
)
ReactDOM.render(
    <App />,
    document.querySelector("#root")
);