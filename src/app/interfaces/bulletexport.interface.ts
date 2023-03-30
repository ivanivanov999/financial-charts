export interface BulletData {
  type: string,
  mode: string,
  value: number,
  delta: {
    reference: number, position: string, increasing: { color: string }, decreasing: { color: string }
  },
  title: {
    text: string,
    font: { size: number }
  },
  gauge: {
    shape: string,
    axis: { range: number[] },
    threshold: {
      line: { color: string, width: number },
      value: number
    },
    bgcolor: string,
    steps: BulletStep[],
    bar: { color: string }
  }
}

export interface BulletLayout {
  margin: {
    t: number,
    r: number,
    b: number,
    l: number
  }
}

export interface BulletStep {
  range: number[],
  color: string
}