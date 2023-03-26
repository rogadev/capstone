<template>
  <div>
    <form @submit="updateAccount" class="flex flex-wrap gap-4 m-4">
      <div class="form-group">
        <label>Email</label>
        <p class=" mt-[0.4rem]">{{ email }}</p>
      </div>
      <div class="form-group">
        <label for="picture">Avatar URL</label>
        <input type="text" name="picture" id="picture" :value="picture">
      </div>
      <div class="form-group">
        <label for="name">Username</label>
        <input type="text" name="name" id="name" :value="name">
      </div>
      <div class="form-group">
        <label for="website">Website</label>
        <input type="text" name="website" id="website" :value="website">
      </div>
    </form>
    <div class="flex flex-col sm:flex-row gap-4 items-center p-4">
      <button @click="() => cancel()" type="button" class="btn btn-secondary btn-wide">Cancel</button>
      <button type="submit" class="btn btn-primary btn-wide">Save</button>
    </div>
  </div>
</template>
  


<script setup lang="ts">
defineProps({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
  cancel: {
    type: Function,
    required: true,
  },
});

const updateAccount = async () => {
  // const supabase = useSupabaseClient();
  // TODO Update user data.
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .update({ name, website, picture })
  //   .match({ id: user.id });
  // if (error) {
  //   console.error(error);
  // }
  // if (data) {
  //   console.log(data);
  // }
};
</script>

<style scoped>
input {
  color: black;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>