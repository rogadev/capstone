<template>
  <div class="container px-4 md:px-0">
    <form @submit="handleSubmit" class="container">
      <div class="input-group-lg">
        <label for="prompt" class="text-3xl font-bold">Trip List</label>
        <p>Copy and paste your list of trips from email into the text area below.</p>
        <textarea v-model="prompt" name="prompt" id="prompt" class="w-full text-black" rows="10"></textarea>
      </div>
      <div class="flex flex-row-reverse">
        <button type="submit" class="btn"
          :class="[generating ? 'loading btn-disabled' : 'btn-primary', generated || prompt === '' ? 'btn-disabled' : '',]">
          {{ generated ? 'Trips Generated' : 'Generate Trips' }}
        </button>
      </div>
    </form>
    <div class="font-semibold text-red-600 dark:text-red-500" v-if="error !== ''">
      {{ error }}
    </div>
    <div v-if="data.length > 0">
      <div v-for="(t, i) in data">
        <form v-if="!submittedTrips.has(i)" :key="i" @submit="handleCreateNewTrip" class="my-4 flex flex-col">
          <input type="hidden" name="index" :value="i" />
          <div class="form-control">
            <label class="label" for="trip_id"><span class="label-text">Trip ID</span></label>
            <input class="text-black input-group" type="text" name="trip_id" id="trip_id" :value="t.trip_id" />
          </div>
          <div class="input-group">
            <label for="pickup_time">Pickup Time</label>
            <input class="text-black" type="text" name="pickup_time" id="pickup_time" :value="t.pickup_time" />
          </div>
          <div class="input-group">
            <label for="passenger_name">Passenger Name</label>
            <input class="text-black" type="text" name="passenger_name" id="passenger_name" :value="t.passenger_name" />
          </div>
          <div class="input-group">
            <label for="passenger_phone">Passenger Phone</label>
            <input class="text-black" type="text" name="passenger_phone" id="passenger_phone"
              :value="t.passenger_phone" />
          </div>
          <div class="input-group">
            <label for="pickup_name">Pickup Name</label>
            <input class="text-black" type="text" name="pickup_name" id="pickup_name" :value="t.pickup_name" />
          </div>
          <div class="input-group">
            <label for="pickup_location_unit">Pickup Location Unit</label>
            <input class="text-black" type="text" name="pickup_location_unit" id="pickup_location_unit"
              :value="t.pickup_location_unit" />
          </div>
          <div class="input-group">
            <label for="pickup_location_street">Pickup Location Street</label>
            <input class="text-black" type="text" name="pickup_location_street" id="pickup_location_street"
              :value="t.pickup_location_street" />
          </div>
          <div class="input-group">
            <label for="pickup_location_city">Pickup Location City</label>
            <input class="text-black" type="text" name="pickup_location_city" id="pickup_location_city"
              :value="t.pickup_location_city" />
          </div>
          <div class="input-group">
            <label for="drop_off_name">Drop Off Name</label>
            <input class="text-black" type="text" name="drop_off_name" id="drop_off_name" :value="t.drop_off_name" />
          </div>
          <div class="input-group">
            <label for="drop_off_location_unit">Drop Off Location Unit</label>
            <input class="text-black" type="text" name="drop_off_location_unit" id="drop_off_location_unit"
              :value="t.drop_off_location_unit" />
          </div>
          <div class="input-group">
            <label for="drop_off_location_street">Drop Off Location Street</label>
            <input class="text-black" type="text" name="drop_off_location_street" id="drop_off_location_street"
              :value="t.drop_off_location_street" />
          </div>
          <div class="input-group">
            <label for="drop_off_location_city">Drop Off Location City</label>
            <input class="text-black" type="text" name="drop_off_location_city" id="drop_off_location_city"
              :value="t.drop_off_location_city" />
          </div>
          <div class="input-group">
            <label for="drop_off_time">Drop Off Time</label>
            <input class="text-black" type="text" name="drop_off_time" id="drop_off_time" :value="t.drop_off_time" />
          </div>
          <div class="input-group">
            <label for="notes">Notes</label>
            <input class="text-black" type="text" name="notes" id="notes" :value="t.notes" />
          </div>
          <button type="submit" class="btn btn-primary btn-wide"
            :class="submittedTrips.has(i) ? 'btn-disabled' : ''">Save</button>
        </form>
        <div v-else class="btn btn-disabled w-full my-4">{{ t.passenger_name }} for {{ t.pickup_time }} - Submitted!</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Trip = {
  trip_id?: string;
  pickup_time: string;
  passenger_name: string;
  passenger_phone: string;
  pickup_name: string;
  pickup_location_unit: string;
  pickup_location_street: string;
  pickup_location_city: string;
  drop_off_name: string;
  drop_off_location_unit: string;
  drop_off_location_street: string;
  drop_off_location_city: string;
  drop_off_time: string;
  notes: string;
};

const generating = ref(false);
const generated = ref(false);
const data: Ref<Trip[]> = ref([]);
const error = ref('');
const submittedTrips: Ref<Set<number>> = ref(new Set());
const prompt = ref('');

const handleCreateNewTrip = async (e: any) => {
  e.preventDefault();
  const index = Number.parseInt(e.target.index.value);
  const trip: Trip = {
    pickup_time: e.target.pickup_time.value,
    passenger_name: e.target.passenger_name.value,
    passenger_phone: e.target.passenger_phone.value,
    pickup_name: e.target.pickup_name.value,
    pickup_location_unit: e.target.pickup_location_unit.value,
    pickup_location_street: e.target.pickup_location_street.value,
    pickup_location_city: e.target.pickup_location_city.value,
    drop_off_name: e.target.drop_off_name.value,
    drop_off_location_unit: e.target.drop_off_location_unit.value,
    drop_off_location_street: e.target.drop_off_location_street.value,
    drop_off_location_city: e.target.drop_off_location_city.value,
    drop_off_time: e.target.drop_off_time.value,
    notes: e.target.notes.value,
  };

  try {
    const response = await fetch('/api/new/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip),
    });
    console.log(response);
    if (response.status === 200) {
      console.log('success');
      console.log(typeof index, index);
      submittedTrips.value.add(index);
      console.log(submittedTrips.value);
    } else {
      console.log('error');
    }
  } catch (e) {
    console.error(e);
  }

};

const handleSubmit = async (e: any) => {
  e.preventDefault();
  error.value = '';
  generating.value = true;
  const prompt = e.target.prompt.value;
  if (prompt === '') {
    error.value = 'Please enter your trips before generating.';
    generating.value = false;
    return;
  }
  try {
    const result = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const json = await result.json();
    data.value = json;
    generating.value = false;
    generated.value = true;
  } catch (e) {
    error.value = "Oops! Something went wrong.";
    console.error(e);
    generating.value = false;
    generated.value = false;
  }
};

watchEffect(() => {
  console.log(...submittedTrips.value);
});
</script>