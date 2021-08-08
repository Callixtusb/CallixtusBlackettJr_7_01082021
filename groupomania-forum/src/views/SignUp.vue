<template>
<validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit" class="loginForm pa-15 my-5">

      <validation-provider
        v-slot="{ errors }"
        name="firstname"
        rules="required"
      >
        <v-text-field class="firstname" 
          v-model="firstname"
          :error-messages="errors"
          label="Firstname"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="lastname"
        rules="required"
      >
        <v-text-field class="lastname" 
          v-model="lastname"
          :error-messages="errors"
          label="Lastname"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field class="email" 
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="password"
        rules="required|max:10"
      >
        <v-text-field class="password"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :counter="10"
          :error-messages="errors"
          label="Password"
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        signup
      </v-btn>

      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
 import { required, digits, email, max, regex, name } from 'vee-validate/dist/rules'
 import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      showPassword: false,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.firstname = ''
        this.lastname = ''
        this.email = ''
        this.password = ''
        this.$refs.observer.reset()
      },
    },
  }
</script>