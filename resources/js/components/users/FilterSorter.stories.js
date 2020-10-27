import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import mock, { proxy } from 'xhr-mock'

import FilterSorter from './FilterSorter'

const FIXTURE_ROLES = [
  { id: 1, name: 'Accountants' },
  { id: 2, name: 'Business Office Director' },
  { id: 3, name: 'Business Office Specialist' },
  { id: 4, name: 'Dining Director' },
  { id: 5, name: 'Dining Partner' },
  { id: 6, name: 'Dining Specialist' },
  { id: 7, name: 'Discipline Leader Accounting' },
  { id: 8, name: 'Discipline Leader Communication' },
  { id: 9, name: 'Discipline Leader Dining' },
  { id: 10, name: 'Discipline Leader Engagement' },
  { id: 12, name: 'Discipline Leader Resident Care' },
  { id: 13, name: 'Discipline leader Sales' },
  { id: 14, name: 'Engagement Director' },
  { id: 15, name: 'Engagement Partner' },
  { id: 16, name: 'Engagement Specialist' },
  { id: 17, name: 'EVP/People' },
  { id: 18, name: 'Executive Director' },
  { id: 19, name: 'Executive Project Coordinator' },
  { id: 20, name: 'HR Specialist' },
  { id: 21, name: 'Maintenance Specialist' },
  { id: 22, name: 'Marketing Specialist' },
  { id: 23, name: 'Memory Care Director' },
  { id: 24, name: 'Miantenance Director ' },
  { id: 25, name: 'Operations Partner' },
  { id: 26, name: 'President/Operations' },
  { id: 27, name: 'Resident Care Director' },
  { id: 28, name: 'Resident Care Partner' },
  { id: 29, name: 'Resident Care Specialist' },
  { id: 30, name: 'Sales Partners' },
  { id: 31, name: 'Sales Specialists' },
  { id: 32, name: 'Senior Care Counselor' },
  { id: 33, name: 'Training Specialist' }
]

const FIXTURE_COMMUNITIES = [
  { id: 1, name: 'Arbor Terrace at Cascade' },
  { id: 2, name: 'Arbor Terrace at Citrus Park' },
  { id: 3, name: 'Arbor Terrace at Crabapple' },
  { id: 4, name: 'Arbor Terrace at Hamilton Mill' },
  { id: 5, name: 'Arbor Terrace at Hamilton Mill IL' },
  { id: 6, name: 'Arbor Terrace at Kingwood Town Center' },
  { id: 7, name: 'Arbor Terrace Fairfax' },
  { id: 8, name: 'Arbor Terrace Fulton' },
  { id: 9, name: 'Arbor Terrace Lakeway' },
  { id: 10, name: 'Arbor Terrace Morris Plains' },
  { id: 11, name: 'Arbor Terrace Mountainside' },
  { id: 12, name: 'Arbor Terrace Mt Laurel' },
  { id: 13, name: 'Arbor Terrace Naperville' },
  { id: 14, name: 'Arbor Terrace of Asheville' },
  { id: 15, name: 'Arbor Terrace of Athens' },
  { id: 16, name: 'Arbor Terrace of Burnt Hickory' },
  { id: 17, name: 'Arbor Terrace of Decatur' },
  { id: 18, name: 'Arbor Terrace of East Cobb' },
  { id: 19, name: 'Arbor Terrace of Herndon' },
  { id: 20, name: 'Arbor Terrace of Johns Creek' },
  { id: 21, name: 'Arbor Terrace of Knoxville' },
  { id: 22, name: 'Arbor Terrace of Middletown' },
  { id: 23, name: 'Arbor Terrace Ortega' },
  { id: 24, name: 'Arbor Terrace Peachtree City' },
  { id: 25, name: 'Arbor Terrace Ponte Vedra' },
  { id: 26, name: 'Arbor Terrace Roseland' },
  { id: 27, name: 'Arbor Terrace San Jose' },
  { id: 28, name: 'Arbor Terrace Senior Living' },
  { id: 29, name: 'Arbor Terrace Shrewsbury' },
  { id: 30, name: 'Arbor Terrace Sudley Manor' },
  { id: 31, name: 'Arbor Terrace Teaneck' },
  { id: 32, name: 'Arbor Terrace Waugh Chapel' },
  { id: 33, name: 'Arbor Terrace Willistown' },
  { id: 34, name: 'Barrington Terrace of Fort Myers' },
  { id: 35, name: 'Barrington Terrace of Naples' },
  { id: 36, name: 'Eden Terrace of Spartanburg' },
  { id: 37, name: 'Renaissance on Peachtree' },
  { id: 38, name: 'Solana East Cobb' },
  { id: 39, name: 'Summit of Uptown' },
  { id: 40, name: 'The Arbor at BridgeMill' },
  { id: 41, name: 'The Arbor Company' },
  { id: 42, name: 'The Gardens at Eastside' },
  { id: 43, name: 'The Lakeside at Amelia ' },
  { id: 44, name: 'The Preserve at Palm Aire' },
  { id: 45, name: 'The Vantage at City View' }
]

mock.setup()
mock.get(/roles.*/, (req, res) => {
  return res.status(200).body(
    JSON.stringify({ data: FIXTURE_ROLES })
  )
})
mock.get(/communities.*/, (req, res) => {
  return res.status(200).body(
    JSON.stringify({ data: FIXTURE_COMMUNITIES })
  )
})
mock.use(proxy)

storiesOf(`Users|FilterSorter`, module)
  .add('mocked', () => ({
    components: { FilterSorter },
    template: `
      <v-container>
        <filter-sorter
          @runFilter="onRun"
        />
      </v-container>
    `,
    methods: {
      onRun (values) {
        action('run')(values)
      }
    }
  }))
