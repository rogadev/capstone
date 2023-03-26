<template>
  <div class="container border border-white rounded mb-4">
    <form v-if="showTrip" :key="index" @submit.prevent="e => handleSubmit(e)" class="m-4 flex flex-col">
      <input v-show="false" type="hidden" name="index" :value="index" />

      <h3 class="text-lg font-bold">Passenger Details</h3>
      <div class="grid grid-cols-5 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="pickup_time">Pickup Time</label>
          <input class="text-black form-input" type="text" name="pickup_time" id="pickup_time"
            :value="trip.pickup_time" />
        </div>
        <div class="form-control col-span-3">
          <label class="label" for="passenger_name">Name</label>
          <input class="text-black input-group" type="text" name="passenger_name" id="passenger_name"
            :value="trip.passenger_name" />
        </div>
        <div class="form-control col-span-1">
          <label class="label" for="passenger_phone">Phone</label>
          <input class="text-black input-group" type="text" name="passenger_phone" id="passenger_phone"
            :value="trip.passenger_phone" />
        </div>
      </div>

      <h3 class="text-lg font-bold">Pickup</h3>
      <div class="form-control">
        <label class="label" for="pickup_name">Location Name</label>
        <input class="text-black input-group" type="text" name="pickup_name" id="pickup_name" v-model="pickupName" />
      </div>
      <div class="grid grid-cols-7 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="pickup_location_unit">Unit</label>
          <input class="text-black input-group" type="text" name="pickup_location_unit" id="pickup_location_unit"
            :value="trip.pickup_location_unit" />
        </div>
        <div class="form-control col-span-4">
          <label class="label" for="pickup_location_street">Street</label>
          <input class="text-black input-group" type="text" name="pickup_location_street" id="pickup_location_street"
            v-model="pickupAddress" />
        </div>
        <div class="form-control col-span-2">
          <label class="label" for="pickup_location_city">City</label>
          <input class="text-black input-group" type="text" name="pickup_location_city" id="pickup_location_city"
            v-model="pickupCity" />
        </div>
      </div>

      <h3 class="text-lg font-bold">Drop Off</h3>
      <div class="form-control">
        <label class="label" for="drop_off_name">Location Name</label>
        <input class="text-black input-group" type="text" name="drop_off_name" id="drop_off_name" v-model="dropoffName" />
      </div>
      <div class="grid grid-cols-7 mb-6 gap-6">
        <div class="form-control col-span-1">
          <label class="label" for="drop_off_location_unit">Unit</label>
          <input class="text-black input-group" type="text" name="drop_off_location_unit" id="drop_off_location_unit"
            :value="trip.drop_off_location_unit" />
        </div>
        <div class="form-control col-span-4">
          <label class="label" for="drop_off_location_street">Street</label>
          <input class="text-black input-group" type="text" name="drop_off_location_street" id="drop_off_location_street"
            v-model="dropoffAddress" />
        </div>
        <div class="form-control col-span-2">
          <label class="label" for="drop_off_location_city">City</label>
          <input class="text-black input-group" type="text" name="drop_off_location_city" id="drop_off_location_city"
            v-model="dropoffCity" />
        </div>
      </div>

      <div class="grid grid-cols-6 gap-6 mb-6">
        <div class="form-control col-span-1">
          <label class="label" for="drop_off_time">Drop Off Time</label>
          <input class="text-black input-group" type="text" name="drop_off_time" id="drop_off_time"
            :value="trip.drop_off_time" />
        </div>
        <div class="form-control col-span-5">
          <label class="label" for="notes">Notes</label>
          <input class="text-black input-group" type="text" name="notes" id="notes" :value="trip.notes" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center mb-12">
        <button type="submit" class="btn btn-primary btn-wide" :class="!showTrip ? 'btn-disabled' : ''">
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
  index: {
    type: Number,
    required: true,
  },
  showTrip: {
    type: Boolean,
    required: true,
  },
  handleSubmit: {
    type: Function,
    required: true,
  }
});

const dropoffName = ref(props.trip.drop_off_name);
const pickupName = ref(props.trip.pickup_name);
const pickupAddress = ref(props.trip.pickup_location_street);
const pickupCity = ref(props.trip.pickup_location_city);
const dropoffAddress = ref(props.trip.drop_off_location_street);
const dropoffCity = ref(props.trip.drop_off_location_city);

const toLocation = computed(() => {
  if (dropoffName.value === '')
    return props.trip.drop_off_location_street + ', ' + props.trip.drop_off_location_city;
  return dropoffName.value;
});
const fromLocation = computed(() => {
  if (pickupName.value === '')
    return props.trip.pickup_location_street + ', ' + props.trip.pickup_location_city;
  return pickupName.value;
});
</script>