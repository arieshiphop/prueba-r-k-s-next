import { formatDate } from "../../../utils/utils";

describe("formatDate", () => {
  it("should return a date in the format dd/mm/yyyy", () => {
    const date = new Date("2023-03-29T00:00:00-07:00");
    expect(formatDate(date)).toBe("29/3/2023");
  });
});
