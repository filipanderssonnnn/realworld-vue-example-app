<template>
  <div class="article" :class="articleClasses">
    <div
      class="article__image-wrapper"
      :class="{
        'article__image-wrapper_no-image': !hasImage
      }"
    >
      <div v-if="hasImage" class="article__image" :data-url="image" v-background-image-lazyload />
    </div>
    <div class="article__content-wrapper">
      <div class="article__title">
        <a class="article__title-link" :href="urlToOriginal" target="_blank">
          {{ title }}
        </a>
      </div>
      <div class="article__description">
        {{ description }}
      </div>
      <div class="article__meta">
        <SourceLink :name="sourceName" :id="sourceId" />
        <BaseDivider type="middot" />
        <div class="article__time">
          {{ formatDate(new Date(publishedAt)) }}
        </div>
        <div v-if="!hideBookmarkButton" class="article__bookmark">
          <BaseButton @click="addBookmark" xs clear transparent>
            <BaseIcon type="Bookmark" />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_BOOKMARK } from '@/store/mutationTypes'
import { mapMutations } from 'vuex'
import { BaseDivider, BaseButton, BaseIcon } from '@/components/base'
import formatDate from '@/utils/formatDate'
import SourceLink from '../SourceLink/SourceLink.vue'

export default {
  name: 'Article',

  props: {
    urlToOriginal: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      default: '',
      required: false
    },

    sourceName: {
      type: String,
      required: true
    },

    sourceId: {
      default: null
    },

    publishedAt: {
      type: String,
      required: true
    },

    image: {
      required: false
    },

    type: {
      type: String,
      default: 'default'
    },

    hideBookmarkButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    articleClasses() {
      const { type } = this

      return `article_${type}`
    },

    hasImage() {
      return !!this.image
    }
  },

  methods: {
    ...mapMutations('bookmarks', [ADD_BOOKMARK]),

    formatDate,

    addBookmark() {
      const { publishedAt, sourceId, sourceName, description, title, urlToOriginal } = this

      this[ADD_BOOKMARK]({
        publishedAt,
        sourceId,
        sourceName,
        description,
        title,
        urlToOriginal
      })
    }
  },

  components: {
    BaseDivider,
    BaseIcon,
    BaseButton,
    SourceLink
  }
}
</script>

<style lang="scss" scoped>
.article {
  $root: &;
  display: flex;
  justify-content: space-between;

  &_default {
    flex-direction: column;

    #{$root}__image-wrapper {
      margin-bottom: 12px;
    }

    #{$root}__content-wrapper {
    }

    #{$root}__image {
      padding-bottom: 56.25%;
    }
  }

  &_list {
    flex-direction: row-reverse;

    #{$root}__image-wrapper {
      width: 25%;
    }

    #{$root}__content-wrapper {
      width: calc(80% - 18px);
      margin-right: 18px;
    }

    #{$root}__image {
      height: 100%;
    }
  }

  &__image-wrapper {
    &_no-image {
      margin: 0 !important;
    }
  }

  &__content-wrapper {
  }

  &__image {
    width: 100%;
    position: relative;
    background: $gray;
    font-size: 0;
    line-height: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
  }

  &__title {
    font-family: $font-family-titles;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 6px;
  }

  &__title-link {
    cursor: pointer;
    text-decoration: none;
    color: $text-color-light;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    color: $text-color-light;
    margin-bottom: 6px;
  }

  &__meta {
    color: $text-color-lighten;
    display: flex;
    align-items: center;
  }

  &__bookmark {
    margin-left: auto;
  }

  &__time {
    cursor: default;
    display: inline-block;
  }
}
</style>
