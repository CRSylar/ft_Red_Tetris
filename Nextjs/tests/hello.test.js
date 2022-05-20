import handler from "../pages/api/hello";

test('test', () => {
	const req = {}

	const json = jest.fn()
	const status = jest.fn( () => {
		return {json}
	})

	const res = {
		status
	}

	handler(req, res)

	expect(status.mock.calls[0][0]).toBe(200)

})