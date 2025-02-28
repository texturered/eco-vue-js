import {type MaybeRef, computed, markRaw, ref, unref} from 'vue'

import IconCopy from '@/assets/icons/sax/IconCopy.svg?component'
import IconCopySuccess from '@/assets/icons/sax/IconCopySuccess.svg?component'

import {Notify} from './Notify'

export const useCopy = (value: MaybeRef<string | number | undefined>) => {
  const copied = ref(false)
  let timeout: NodeJS.Timeout | undefined

  const iconCopy = computed(() => copied.value ? markRaw(IconCopySuccess) : markRaw(IconCopy))

  const checkPermission = async (): Promise<boolean> => {
    const result = await navigator.permissions.query({name: 'clipboard-write' as PermissionName})

    return result.state === 'granted' || result.state === 'prompt'
  }

  const _doCopy = () => {
    const text = unref(value)

    if (!text) {
      Notify.warn({
        title: 'Nothing to copy',
      })

      return Promise.resolve()
    }

    return navigator.clipboard.writeText(typeof text === 'number' ? `${ text }` : text)
      .then(() => {
        copied.value = true

        Notify.success({
          title: 'Copied',
        })

        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
          timeout = undefined
          copied.value = false
        }, 1000)
      })
      .catch(() => {
        Notify.error({
          title: 'Copy failed',
        })
      })
  }

  const doCopy = () => {
    _doCopy()
      .catch(async () => {
        if (!(await checkPermission())) {
          Notify.error({
            title: 'Copy failed',
            caption: 'Writing to clipboard is not permitted',
          })
        }

        _doCopy()
      })
  }

  return {
    copied,
    iconCopy,
    doCopy,
  }
}
