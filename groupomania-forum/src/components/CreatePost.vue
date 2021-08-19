<template>
  <main id="Post">
    <div>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-row">
          <label for="title"></label>
          <input
            type="text"
            class="form-row__input title_field"
            id="title"
            v-model="title"
            placeholder="Votre titre"
            aria-required="true"
            required
          /><br />
          <span class="error" v-if="!$v.title.required && $v.title.$dirty"
            >Veuillez ajouter un titre</span
          >
        </div>
        <div class="form-row">
          <label for="content"></label>
          <textarea
            class="form-row__input textarea"
            v-model="content"
            rows="3"
            id="content"
            placeholder="Votre texte et image"
            aria-required="true"
            required
          ></textarea>
        </div>
        <div class="form-row">
          <label class="sr-only" for="image" title="image" role="button"></label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .webp"
            v-on:change="onSelect"
            ref="file"
            aria-required="true"
            id="image"
          />
        </div>
        <span class="error" v-if="!$v.content.required && $v.content.$dirty"
          >Veuillez ajouter une image et un texte</span
        ><br /><br />
        <span id="notfound" class="error"> </span>
        <button type="submit" class="btn btn-danger btn-publier signup" @click="Postform()">
          Publier
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      file: "",
      content: "",
    };
  },
  validations: {
    title: {
      required,
    },
    content: {
      required,
    },
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    Postform() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(
          localStorage.getItem("token")
        ).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }
        
        axios
          .post(this.$localhost + "api/post/create", formData, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Une erreur est survenue, veuillez réessayer ultérieurement";
          });
      }
    },
  },
};
</script>
<style scoped>
#post {
  text-align: center;
}
.error {
  color: black;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  border: 1px solid black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}

.button {
  background: #cacbcd;
}

.btn-publier {
  background: #d6d7d8;
  padding: 8px 10px;
  border-radius: 5px 5px; 
  display: block;
  margin-left: auto;
  margin-right: auto 

}

@media (min-width: 320px) and (max-width: 1024px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .product-img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
