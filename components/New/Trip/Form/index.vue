<template>
  <div class="container border border-white rounded mb-4">
    <form v-if="!submitted" @submit.prevent="e => handleSubmit(e)" class="m-4 flex flex-col">
      <input type="hidden" name="date" :value="trip.date" />

      <div class="flex flex-row justify-between items-baseline">
        <h3 class="text-lg font-bold">Passenger Details</h3>
        <h4 class="font-bold">{{ trip.date }}</h4>
      </div>
      <div class="grid grid-cols-5 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="pickup_time">Pickup Time</label>
          <input class="text-black form-input" type="text" name="pickup_time" id="pickup_time" v-model="pickupTime" />
        </div>
        <div class="form-control col-span-3">
          <label class="label" for="passenger_name">Name</label>
          <input class="text-black input-group" type="text" name="passenger_name" id="passenger_name"
            v-model="passengerName" />
        </div>
        <div class="form-control col-span-1">
          <label class="label" for="passenger_phone">Phone</label>
          <input class="text-black input-group" type="text" name="passenger_phone" id="passenger_phone"
            v-model="passengerPhone" />
        </div>
      </div>

      <h3 class="text-lg font-bold">Pickup</h3>
      <div class="form-control">
        <label class="label" for="pickup_name">Location Name</label>
        <input class="text-black input-group" type="text" name="pickup_name" id="pickup_name"
          v-model="pickupAddressName" />
      </div>
      <div class="grid grid-cols-7 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="pickup_location_unit">Unit</label>
          <input class="text-black input-group" type="text" name="pickup_location_unit" id="pickup_location_unit"
            v-model="pickupAddressUnit" />
        </div>
        <div class="form-control col-span-4">
          <label class="label" for="pickup_location_street">Street</label>
          <input class="text-black input-group" type="text" name="pickup_location_street" id="pickup_location_street"
            v-model="pickupAddressStreet" />
        </div>
        <div class="form-control col-span-2">
          <label class="label" for="pickup_location_city">City</label>
          <input class="text-black input-group" type="text" name="pickup_location_city" id="pickup_location_city"
            v-model="pickupAddressCity" />
        </div>
      </div>

      <h3 class="text-lg font-bold">Drop Off</h3>
      <div class="form-control">
        <label class="label" for="drop_off_name">Location Name</label>
        <input class="text-black input-group" type="text" name="drop_off_name" id="drop_off_name"
          v-model="dropOffAddressName" />
      </div>
      <div class="grid grid-cols-7 mb-6 gap-6">
        <div class="form-control col-span-1">
          <label class="label" for="drop_off_location_unit">Unit</label>
          <input class="text-black input-group" type="text" name="drop_off_location_unit" id="drop_off_location_unit"
            v-model="dropOffAddressUnit" />
        </div>
        <div class="form-control col-span-4">
          <label class="label" for="drop_off_location_street">Street</label>
          <input class="text-black input-group" type="text" name="drop_off_location_street" id="drop_off_location_street"
            v-model="dropOffAddressStreet" />
        </div>
        <div class="form-control col-span-2">
          <label class="label" for="drop_off_location_city">City</label>
          <input class="text-black input-group" type="text" name="drop_off_location_city" id="drop_off_location_city"
            v-model="dropOffAddressCity" />
        </div>
      </div>

      <div class="grid grid-cols-6 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="drop_off_time">Drop Off Time</label>
          <input class="text-black input-group" type="text" name="drop_off_time" id="drop_off_time"
            @blur="formatDropOffTime" v-model="dropOffTime" />
        </div>
        <div class="form-control col-span-5">
          <label class="label" for="notes">Notes</label>
          <input class="text-black input-group" type="text" name="notes" id="notes" v-model="notes" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center mb-12">
        <button type="submit" class="btn btn-primary btn-wide"
          :class="{ 'loading': submitting, 'btn-disabled': submitted }">
          Save
        </button>
      </div>
    </form>
    <div v-else class="btn btn-disabled w-full my-4">
      <div class="w-full flex flex-row gap-4 items-center justify-evenly">
        <div>
          {{ trip.pickup_time }}
        </div>
        <div>
          {{ trip.passenger_name }}
        </div>
        <div>
          {{ fromLocation }} ➡️ {{ toLocation }}
        </div>
        <div>
          Submitted!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const date = ref(props.trip.date);
const pickupTime = ref(props.trip.pickup_time);
const passengerName = ref(props.trip.passenger_name);
const passengerPhone = ref(props.trip.passenger_phone);
const pickupAddressName = ref(props.trip.pickup_name);
const pickupAddressUnit = ref(props.trip.pickup_location_unit);
const pickupAddressStreet = ref(props.trip.pickup_location_street);
const pickupAddressCity = ref(props.trip.pickup_location_city);
const dropOffAddressName = ref(props.trip.drop_off_name);
const dropOffAddressUnit = ref(props.trip.drop_off_location_unit);
const dropOffAddressStreet = ref(props.trip.drop_off_location_street);
const dropOffAddressCity = ref(props.trip.drop_off_location_city);
const dropOffTime = ref(props.trip.drop_off_time);
const notes = ref(props.trip.notes);
const showTrip = ref(true);

const toLocation = computed(() => {
  if (dropOffAddressName.value === '')
    return props.trip.drop_off_location_street + ', ' + props.trip.drop_off_location_city;
  return dropOffAddressName.value;
});
const fromLocation = computed(() => {
  if (pickupAddressName.value === '')
    return props.trip.pickup_location_street + ', ' + props.trip.pickup_location_city;
  return pickupAddressName.value;
});

const submitting = ref(false);
const submitted = ref(false);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const data = {
    date: date.value,
    pickupTime: pickupTime.value,
    passengerName: passengerName.value,
    passengerPhone: passengerPhone.value,
    pickupAddressName: pickupAddressName.value,
    pickupAddressUnit: pickupAddressUnit.value,
    pickupAddressStreet: pickupAddressStreet.value,
    pickupAddressCity: pickupAddressCity.value,
    dropOffAddressName: dropOffAddressName.value,
    dropOffAddressUnit: dropOffAddressUnit.value,
    dropOffAddressStreet: dropOffAddressStreet.value,
    dropOffAddressCity: dropOffAddressCity.value,
    dropOffTime: dropOffTime.value,
    notes: notes.value,
  };
  submitting.value = true;
  const response = await fetch(`/api/trips/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    console.info('Trip submitted successfully!');
    showTrip.value = false;
    submitted.value = true;
  } else {
    console.error('Error submitting trip');
  }
  submitting.value = false;
};

const formatDropOffTime = () => {
  const timeStr = dropOffTime.value;
  // Remove whitespace and make lowercase for easier parsing
  const cleanedStr = timeStr.replace(/\s+/g, '').toLowerCase();

  // Use a regular expression to capture the various components of the time string
  const timeRegex = /(\d{1,2})[:l]?(\d{2})?(am|pm)?/;
  const match = cleanedStr.match(timeRegex);

  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2] || '0', 10);
    const amPm = match[3];

    // Check for 12-hour format with am/pm indicator
    if (amPm) {
      if (hours === 12 && amPm === 'am') {
        hours = 0;
      } else if (hours !== 12 && amPm === 'pm') {
        hours += 12;
      }
    }

    // Format hours and minutes as two-digit strings
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    dropOffTime.value = `${hoursStr}:${minutesStr}`;
  };
};
</script>