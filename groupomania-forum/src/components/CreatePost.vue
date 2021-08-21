<template>
  <main id="Post">
    <div>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">

      <div class="text-block">
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
            class="form-row__input textarea_field"
            v-model="content"
            rows="3"
            id="content"
            placeholder="Votre texte"
            aria-required="true"
            required
          ></textarea>

          <span class="error" v-if="!$v.content.required && $v.content.$dirty"
            >Veuillez ajouter un texte</span>
        </div>
      </div>

      <div class="choose-file_and_button_block"> <!-- Iincludes the type of files that can be uploaded-->
        <div class="choose-file">
          <label class="sr-only" for="image" title="image" role="button"></label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .webp"
            v-on:change="onSelect"
            ref="file"
            aria-required="true"
            id="image"/>
        
          <br /><br />
          <span id="notfound" class="error"> </span>

        <button type="submit" class="btn btn-danger btn-publier signup" @click="Postform()">
        Publier
      </button>  
        </div>  
      

      </div>



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
#image {
  margin-left: 0px;
  margin-right: auto;
}

#post {
  
}
.error {
  color: black;
}

.text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: 16px;
  width: 50%;
  padding-bottom: 10px;
}

.choose-file_and_button_block {
  
}

.choose-file {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: auto;
  
  width: 50%;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
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
  padding: 3px 10px;
  border-radius: 3px 3px;
  border: 1px solid #6b6969;
 

}

@media (min-width: 320px) and (max-width: 1024px) {
.text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: 16px;
  width: 100%;

}

.choose-file {
 
  width: 100%;
}

}
</style>
