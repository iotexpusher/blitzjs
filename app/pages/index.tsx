import { Button, Form, Input } from "antd"
import { useForm } from "antd/lib/form/Form"
import { Head, Router } from "blitz"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { css } from "utils/stitches.config"
import { useStore } from "../../stores/index"
import { globalStyles } from "../../utils/styles"

const Home = observer(() => {
  const { grade, auth } = useStore()
  const [form] = useForm()
  const store = useLocalObservable(() => ({
    initAdderss: "",
    async onSubmit(values) {
      const { address } = values
      localStorage.setItem("address", address)
      console.log({ address })
      await auth.login({ address })
      Router.push("/mining")
    },
  }))
  useEffect(() => {
    grade.init()
    form.setFieldsValue({
      address: localStorage.getItem("address"),
    })
  }, [])

  return (
    <div className={globalStyles.container}>
      <Head>
        <title>blitzjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Form onFinish={store.onSubmit} form={form}>
          <Form.Item
            label=""
            initialValue={store.initAdderss}
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  )
})

export default Home
